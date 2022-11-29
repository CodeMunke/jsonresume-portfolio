import fetch from 'node-fetch';
import { launch } from "puppeteer";
import express from 'express';
import theme from './index.js';

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const addr = `http://localhost:${PORT}/`;
const app = express();
var resume = await (await fetch(process.env.JSONRESUME_URL)).json();

function render(resume) {
  try {
      return theme.render(JSON.parse(JSON.stringify(resume)));
  } catch (e) {
      console.log(e.message);
      return '';
  }
}

const getPdf = async () => {
  const browser = await launch();
  const page = await browser.newPage();
  await page.goto(addr, {
    waitUntil: "networkidle2"
  });
  const pdf = await page.pdf({    
    format: "A4",
    landscape: false,
    displayHeaderFooter: true,
    headerTemplate: ``,
    footerTemplate: `<div style="font-size:7px;white-space:nowrap;margin-left:38px;width:100%;">
                        <span style="display:inline-block;float:right;margin-right:10px;">
                            <span class="pageNumber"></span> / <span class="totalPages"></span>
                        </span>
                    </div>`,
    margin: {
      // top: '38px',
      // right: '38px',
      bottom: '38px',
      // left: '38px'
    }
  });

  await browser.close();
  return pdf;
};

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

app.listen(PORT, () => {
  console.log(`Serving resume at: ${addr}`);
})