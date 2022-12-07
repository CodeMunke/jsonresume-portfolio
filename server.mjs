import fetch from 'node-fetch';
import { launch } from "puppeteer";
import express from 'express';
import theme from './index.js';

import onepage from './assets/onepage/index.js'
import RemoveMarkdown from 'remove-markdown';

import dotenv from 'dotenv';
dotenv.config();

const port = process.env.port;
const addr = `http://localhost:${port}/`;
const app = express();
const truncRegex = /⁠.+?⁠/gm;
const resumeEndpoint = "resume";

var resume = await (await fetch(process.env.JSONRESUME_URL)).json();

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
  const browser = await launch();
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
app.get('/pdf', async (_, res) => {
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
app.get(`/${resumeEndpoint}Pdf`, async (_, res) => {
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
app.get(`/${resumeEndpoint}`, async (_, res) => {
  resume = await (await fetch(process.env.JSONRESUME_URL)).json();
  res.writeHead(200, {
      'Content-Type': 'text/html'
  });
  res.end(render(resume, false));
})

//Render full CV
app.get('/', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Serving CV at: ${addr}`);
  console.log(`Serving resume at: ${addr}${resumeEndpoint}`);
})