# Portfolio complex (CV + Resume)

A site-portfolio designed to streamline the resume and CV generation process based on two [JSONResume](https://jsonresume.org/) themes and a little bit of CSS/JS greasing.

## Architecture

The site consists of three modules:

1. **Main/CV module**: for portfolio serving and CV generation. It uses the [Elegant](https://github.com/mudassir0909/jsonresume-theme-elegant) JSONResume theme as base. Written using JS and LESS + Pug/Jade.
2. **Resume module**: made for serving and generation of the **truncated one-page resume**. Based on the [OnePage](https://github.com/ainsleyc/jsonresume-theme-onepage) JSONResume theme. Extremely simplistic, written in JS + CSS + HBS placed in `assets/onepage/`;
3. **Backend module**: made to serve and handle the above frontend modules. Made with NodeJS. Located entirely within `server.mjs`.

***The project uses `.env` environment variables, don't forget to define them!***

## How to deploy

### **Define resume.json**

Make your own resume.json like specified in `resume_example.json` and either referece it in your file system or host it elsewhere (I, for example, host it on GitHub gists). There are key differences between the usual `resume.json` format and this one:

* It has and uses `resume.basics.objective`, the objective of your job search;
* It Uses `resume.picture` instead of `resume.image`;
* Since this project is based on the Elegant theme, [which supports Markdown rendering](https://github.com/mudassir0909/jsonresume-theme-elegant#markdown-supported) you can format your text in this way;
* It uses `resume.work[i].url` instead of `resume.work[i].website`;
* The server truncates everything in `resume.json` that is placed between the [word joiners](https://unicode-table.com/en/2060/) when it renders the resume. ***They won't be removed when rendering the full CV.*** Example:
  >I'm rendering a truncated one-page resume for these HR people⁠;~~ but my resume.json is too large, oh noes!⁠~~ Thankfully, the server removes the last bit between the word joiners (yes, you can't see them).

### **Prepare the project**

```bash
git clone https://github.com/CodeMunke/jsonresume-portfolio.git
npm install -g grunt
npm install -g pug-cli
cd jsonresume-portfolio
npm install
```

Then, create the `.env` file:

```bash
touch .env
```

And define 2 variables there:

```bash
#Serving port.
PORT=3000

#URL to resume.json
JSONRESUME_URL="your_link_here"
```

On the other hand, if you intend to run the server as a [systemd daemon](https://nodesource.com/blog/running-your-node-js-app-with-systemd-part-1/) you can instead copypaste the contents of the `.env` file into the [systemd environment file](https://flatcar-linux.org/docs/latest/setup/systemd/environment-variables/).

### **Build and run!**

```bash
#To build AND serve
$ grunt serve
...
Serving CV at: http://localhost:{PORT}/
Serving resume at: http://localhost:{PORT}/{resumeEndpoint}

#To build only
grunt build

#To serve only
$ grunt exec:run_server
...
Serving CV at: http://localhost:{PORT}/
Serving resume at: http://localhost:{PORT}/{resumeEndpoint}

#Alternatively...
$ node server.mjs
...
Serving CV at: http://localhost:{PORT}/
Serving resume at: http://localhost:{PORT}/{resumeEndpoint}
```

### **Regarding modifications and contributions**

Just follow the ***DANGER*** signs from [both](https://github.com/mudassir0909/jsonresume-theme-elegant#contributing) [repos](https://github.com/ainsleyc/jsonresume-theme-onepage) and everything should be A-OK 😉

**And now, for the fun stuff!**

## Feature overview

The key feature of this portfolio complex is that it has TWO buttons:

* *Download resume*; this one exports the CV into a truncated *hopefully* one-page resume *(depends on how much of your CV you're willing to let go of using the word joiners)*. No bling; no icons; spartan, strct and short.
* *Download full CV*; this one, however, does a full export of your CV with no compomises. Icons, sections, socials, all rendered into a neat printable form.
  
Both of them export the CV and truncated resume into neat PDFs, yay! 😄

## Roadmap and room for improvment

* [ ] Resolve the custom fontpack/iconpack problem
* [ ] Streamline the resume.json edits using GitHub actions