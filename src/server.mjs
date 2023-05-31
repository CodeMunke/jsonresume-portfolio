import fetch from 'node-fetch';
import express from 'express';
// import helmet from "helmet";
import { launch } from 'puppeteer';

import theme from './static/elegant/index.js';
import onepage from './static/onepage/index.js';

import RemoveMarkdown from 'remove-markdown';

import dotenv from 'dotenv';
import locateChrome from 'locate-chrome';
dotenv.config();

const addr = `http://localhost:3000/`;
const truncRegex = /⁠.+?⁠/gm;
const resumeEndpoint = "resume";

const app = express();
const router = express.Router();

var resume = await (await fetch(process.env.JSONRESUME_URL)).json();

const executablePath = await new Promise(resolve => locateChrome((arg) => resolve(arg))) || '';

//Renders the requested resume
function render(resume, isFull = true) {
  try {
    if (isFull)
      //Remove all word joiners
      return theme.render(JSON.parse(JSON.stringify(resume).replaceAll('⁠', '')));
    else {
      //Remove: markdown formatting, everything marked with word joiners AND the '>' symbol
      const shortResumeStr = RemoveMarkdown(JSON.stringify(resume)).replace(truncRegex, '').replaceAll('>', '');
      return onepage.render(JSON.parse(shortResumeStr));
    }
  } catch (e) {
      console.log(e.message);
      return '';
  }
}

const getPdf = async (isFull = true) => {
  const browser = await launch({
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(isFull ? addr : addr + resumeEndpoint, {
    waitUntil: "networkidle2"
  });
  const pdf = await page.pdf({    
    format: "A4",
    landscape: false,
    displayHeaderFooter: isFull,
    headerTemplate: ``,
    footerTemplate: `<div style="font-size:7px;white-space:nowrap;margin-left:38px;width:100%;">
                        <span style="display:inline-block;float:right;margin-right:10px;">
                            <span class="pageNumber"></span> / <span class="totalPages"></span>
                        </span>
                    </div>`,
    margin: {
      bottom: isFull ? '38px' : '0px',
      top: '0px',
      left: '0px',
      right: '0px'
    }
  });

  await browser.close();
  return pdf;
};



//Export full CV into PDF
router.get('/pdf', async (_, res) => {
  const pdf = await getPdf();
  const pdfName = (resume.basics.name + "_CV.pdf").replace(' ', '_');
  res.set({
    "Content-Type": "application/pdf",
    "Content-Length": pdf.length,
    'Content-Disposition': 'attachment; filename=' + pdfName,
  });
  res.send(pdf);
});

//Export resume into PDF
router.get(`/${resumeEndpoint}Pdf`, async (_, res) => {
  const pdf = await getPdf(false);
  const pdfName = (resume.basics.name + "_resume.pdf").replace(' ', '_');
  res.set({
    "Content-Type": "application/pdf",
    "Content-Length": pdf.length,
    'Content-Disposition': 'attachment; filename=' + pdfName,
  });
  res.send(pdf);
});

//Render truncated one-page resume
router.get(`/${resumeEndpoint}`, async (_, res) => {
  resume = await (await fetch(process.env.JSONRESUME_URL)).json();
  res.writeHead(200, {
      'Content-Type': 'text/html'
  });
  res.end(render(resume, false));
})

//Render full CV
router.get('/', async (req, res) => {
  resume = await (await fetch(process.env.JSONRESUME_URL)).json();
  const picture = resume.basics.picture && resume.basics.picture.replace(/^\//, '');

  if (picture && req.url.replace(/^\//, '') === picture.replace(/^.\//, '')) {
      const format = extname(picture);
      try {
          const image = fs.readFileSync(picture);
          res.writeHead(200, {
              'Content-Type': `image/${format}`,
          });
          res.end(image, 'binary');
      } catch (error) {
          if (error.code === 'ENOENT') {
              console.log('Picture not found!');
              res.end();
          } else {
              throw error;
          }
      }
  } else {
      res.writeHead(200, {
          'Content-Type': 'text/html'
      });
      res.end(render(resume));
  }
})

app.use(express.static('./static'));
app.use('/', router);
// app.use((_, res, next) => {
//   res.locals.scpNonce = crypto.randomBytes(16).toString("hex");
//   next();
// })
// app.use(helmet({
//   contentSecurityPolicy: {
//     directives: {
//       scriptSrc: ["'self'", (_, res) => `'nonce-${res.locals.scpNonce}'`]
//     }
//   }
// }));

app.listen(3000, () => {
  console.log(`Serving CV at: ${addr}`);
  console.log(`Serving resume at: ${addr}${resumeEndpoint}`);
})