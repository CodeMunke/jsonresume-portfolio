function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"index.pug":"|\u003C!DOCTYPE html\u003E\r\nhtml(lang=\"en\")\r\n  head\r\n    meta(charset=\"utf-8\")\r\n    meta(http-equiv=\"X-UA-Compatible\", content=\"IE=edge\")\r\n    meta(name=\"viewport\", content=\"width=device-width, initial-scale=1\")\r\n    title= resume.basics.name\r\n    include pug\u002Fstylesheets.pug\r\n\r\n  body(itemscope, itemtype=\"http:\u002F\u002Fschema.org\u002FPerson\")\r\n    .container-fluid\r\n      .row.main.clearfix\r\n        include pug\u002Ffloating-nav.pug\r\n        include pug\u002Fprofile-card.pug\r\n        include pug\u002Fbackground-card.pug\r\n\r\n    include pug\u002Fscripts.pug\r\n","pug\\stylesheets.pug":"link(rel=\"stylesheet\", href=\"https:\u002F\u002Fmaxcdn.bootstrapcdn.com\u002Fbootstrap\u002F3.3.6\u002Fcss\u002Fbootstrap.min.css\")\r\nstyle!= css\r\n","pug\\floating-nav.pug":"mixin make_nav_link(nav_item)\r\n  li\r\n    a(href=\"#\" + nav_item.target)\r\n      i.mr-10(class='icon-' + nav_item.icon)\r\n      | #{nav_item.label}\r\n\r\na(href=\"#\").js-floating-nav-trigger.floating-nav-trigger\r\n  i.icon-bars\r\n  span.close-icon &times;\r\n\r\nnav.floating-nav.js-floating-nav\r\n  ul.list-unstyled\r\n    each nav_item in floating_nav_items\r\n      +make_nav_link(nav_item)\r\n","pug\\profile-card.pug":"mixin profile_card_detail(icon, info, itemprop, icon_title)\r\n  .detail\r\n    span.icon(title=icon_title)\r\n      i.icon.fs-lg(class=icon)\r\n    span.info(itemprop=itemprop)\r\n      if block\r\n        block\r\n      else\r\n        |#{info}\r\n\r\nmixin render_links(profiles)\r\n  each profile in profiles\r\n    a.fs-2x.social-link(\r\n      href=profile.url,\r\n      target=\"_blank\",\r\n      data-toggle=\"tooltip\",\r\n      title= resume.basics.name + \" on \" + profile.network,\r\n      class=\"link-\" + profile.label + \" icon-\" + profile.label)\r\n      if profile.network.toLowerCase() == 'meetup'\r\n        span.path2\r\n        span.path3\r\n      if profile.network.toLowerCase() == 'gitlab'\r\n        span.path1\r\n        span.path2\r\n        span.path3\r\n        span.path4\r\n        span.path5\r\n        span.path6\r\n        span.path7\r\n        span.path8\r\n\r\nsection.col-md-3.card-wrapper.profile-card-wrapper.affix\r\n  .card.profile-card\r\n    span.profile-pic-container\r\n      .profile-pic\r\n        img.media-object.img-circle.center-block(\r\n          data-src=\"holder.js\u002F100x100\",\r\n          alt=resume.basics.name,\r\n          src=resume.basics.picture,\r\n          itemprop=\"image\")\r\n\r\n      .name-and-profession.text-center\r\n        h3(itemprop=\"name\"): b= resume.basics.name\r\n        h5.text-muted(itemprop=\"jobTitle\")= resume.basics.label\r\n\r\n    hr\r\n\r\n    .contact-details.clearfix\r\n      if resume.basics.computed_location\r\n        +profile_card_detail(\"icon-location\", resume.basics.computed_location, null, 'My current location')\r\n      if resume.basics.phone\r\n        +profile_card_detail(\"icon-phone\", resume.basics.phone, \"telephone\")\r\n      if resume.basics.email\r\n        +profile_card_detail(\"icon-mail\")\r\n          a.link-disguise(href=\"mailto:\" + resume.basics.email, itemprop=\"email\")= resume.basics.email\r\n      if resume.basics.website\r\n        +profile_card_detail(\"icon-link\")\r\n          a(href=resume.basics.website, target=\"_blank\")= resume.basics.website\r\n      if resume.basics.languages\r\n        +profile_card_detail('icon-language', resume.basics.languages, null, 'Languages I speak')\r\n    hr\r\n    .download-btn \r\n      button.btn.btn-default.inner()\r\n        \u002F\u002F- span.icon()\r\n        \u002F\u002F-   i.icon.fs-lg(class='icon-download')\r\n        span.info() Print\u002FExport this CV\r\n    hr\r\n\r\n    .social-links.text-center\r\n      div\r\n        +render_links(resume.basics.top_five_profiles)\r\n\r\n        if resume.basics.remaining_profiles.length \u003E 0\r\n          button.btn.btn-default.btn-sm.btn-circle-sm.pull-right.js-profiles-collapse(\r\n            data-toggle=\"collapse\",\r\n            data-target=\"#remaining-profiles\")\r\n            i.icon-chevron-down.fs-lg\r\n\r\n          #remaining-profiles.collapse.text-left\r\n            +render_links(resume.basics.remaining_profiles)\r\n","pug\\background-card.pug":"section.col-md-9.card-wrapper.pull-right\r\n  .card.background-card\r\n    h4.text-uppercase Background\r\n    hr\r\n\r\n    .background-details\r\n      include background\u002Fabout.pug\r\n      include background\u002Fwork-experience.pug\r\n      include background\u002Fprojects-experience.pug\r\n      include background\u002Fskills.pug\r\n      include background\u002Feducation.pug\r\n      include background\u002Fcertificates.pug\r\n      include background\u002Fawards.pug\r\n      include background\u002Fvolunteer-work.pug\r\n      include background\u002Fpublications.pug\r\n      include background\u002Finterests.pug\r\n      include background\u002Freferences.pug\r\n","pug\\background\\about.pug":"unless _.isEmpty(resume.basics.summary)\r\n  .detail#about\r\n    .icon\r\n      i.fs-lg.icon-board\r\n      span.mobile-title About\r\n    .info\r\n      h4.title.text-uppercase About\r\n\r\n      .card.card-nested\r\n        .content.mop-wrapper(itemprop=\"description\")!= resume.basics.summary\r\n","pug\\background\\work-experience.pug":"unless _.isEmpty(resume.work)\r\n  .detail#work-experience\r\n    .icon\r\n      i.fs-lg.icon-office\r\n      span.mobile-title Work Experience\r\n\r\n    .info\r\n      h4.title.text-uppercase Work Experience\r\n\r\n      ul.list-unstyled.clear-margin\r\n        each experience in resume.work\r\n          li.card.card-nested.clearfix\r\n            .content\r\n              p.clear-margin.relative\r\n                if !experience.endDate\r\n                  i.icon-circle.current-event(\r\n                    rel=\"tooltip\",\r\n                    title=\"Currently Working\",\r\n                    data-placement=\"left\"\r\n                  )\r\n                strong= experience.position\r\n                |,&nbsp;\r\n                if experience.url\r\n                  a(href=experience.url, target=\"_blank\")= experience.name\r\n                else\r\n                  |#{experience.name}\r\n\r\n              p.text-muted\r\n                small\r\n                  span.space-right\r\n                    |#{experience.startDate} - #{experience.endDate || 'Present'}\r\n\r\n                  if experience.duration\r\n                    span\r\n                      i.icon-clock.mr-5\r\n                      |#{experience.duration}\r\n\r\n              .mop-wrapper.space-bottom!= experience.summary\r\n\r\n              unless _.isEmpty(experience.highlights)\r\n                ul\r\n                  each highlight in experience.highlights\r\n                    li.mop-wrapper!= highlight\r\n","pug\\background\\projects-experience.pug":"unless _.isEmpty(resume.projects)\r\n  .detail#projects-experience\r\n    .icon\r\n      i.fs-lg.icon-code\r\n      span.mobile-title Projects Experience\r\n\r\n    .info\r\n      h4.title.text-uppercase Projects Experience\r\n\r\n      ul.list-unstyled.clear-margin\r\n        each project in resume.projects\r\n          li.card.card-nested.clearfix\r\n            .content\r\n              p.clear-margin.relative\r\n                if !project.endDate\r\n                  i.icon-circle.current-event(\r\n                    rel=\"tooltip\",\r\n                    title=\"Currently Working\",\r\n                    data-placement=\"left\"\r\n                  )\r\n                if project.url\r\n                  a(href=project.url, target=\"_blank\")\r\n                    strong=project.name\r\n                else\r\n                  strong=project.name\r\n                if project.entity\r\n                  span\r\n                    |,&nbsp;#{project.entity}\r\n\r\n              p.text-muted\r\n                small\r\n                  span.space-right\r\n                    |#{project.startDate} - #{project.endDate || 'Present'}\r\n\r\n                  if project.duration\r\n                    span\r\n                      i.icon-clock.mr-5\r\n                      |#{project.duration}\r\n\r\n              .mop-wrapper.space-bottom!= project.description\r\n\r\n              unless _.isEmpty(project.highlights)\r\n                ul\r\n                  each highlight in project.highlights\r\n                    li.mop-wrapper!= highlight\r\n","pug\\background\\skills.pug":"unless _.isEmpty(resume.skills)\r\n  .detail#skills\r\n    .icon\r\n      i.fs-lg.icon-tools\r\n      span.mobile-title Skills\r\n\r\n    .info\r\n      h4.title.text-uppercase Skills\r\n\r\n      .content\r\n        ul.list-unstyled.clear-margin\r\n          each skill in resume.skills\r\n            li.card.card-nested.card-skills\r\n              if skill.display_progress_bar\r\n                .skill-level(data-toggle=\"tooltip\", title=skill.level, data-placement=\"left\")\r\n                  .skill-progress(class=skill.skill_class)\r\n\r\n              .skill-info\r\n                strong= skill.name\r\n\r\n                unless _.isEmpty(skill.keywords)\r\n                  .space-top.labels\r\n                    each keyword in skill.keywords\r\n                      span.label.label-keyword!= keyword\r\n","pug\\background\\education.pug":"unless _.isEmpty(resume.education)\r\n  .detail#education\r\n    .icon\r\n      i.fs-lg.icon-graduation-cap\r\n      span.mobile-title Education\r\n\r\n    .info\r\n      h4.title.text-uppercase Education\r\n\r\n      .content\r\n        ul.list-unstyled.clear-margin\r\n          each education_info in resume.education\r\n            li.card.card-nested\r\n              .content\r\n                p.clear-margin.relative\r\n                  if !education_info.endDate\r\n                    i.icon-circle.current-event(\r\n                      rel=\"tooltip\",\r\n                      title=\"Currently Pursuing\",\r\n                      data-placement=\"left\"\r\n                    )\r\n\r\n                  strong\r\n                    |#{education_info.area}, #{education_info.studyType},&nbsp;\r\n                  |#{education_info.institution}\r\n\r\n                p.text-muted(class=!education_info.gpa && _.isEmpty(education_info.courses) ? 'clear-margin' : '')\r\n                  small\r\n                    |#{education_info.startDate} - #{education_info.endDate || 'Present'}\r\n                i= education_info.gpa\r\n\r\n                unless _.isEmpty(education_info.courses)\r\n                  .space-top.labels\r\n                    each course in education_info.courses\r\n                      span.label.label-keyword!= course\r\n\r\n","pug\\background\\certificates.pug":"unless _.isEmpty(resume.certificates)\r\n  .detail#certificates\r\n    .icon\r\n      i.fs-lg.icon-profile\r\n      span.mobile-title Certificates\r\n\r\n    .info\r\n      h4.title.text-uppercase Certificates\r\n\r\n      .content\r\n        ul.list-unstyled.clear-margin\r\n          each certificate in resume.certificates\r\n            li.card.card-nested\r\n              .content\r\n                p.clear-margin(itemprop=\"certificate\")\r\n                  strong\r\n                    if certificate.url\r\n                      a(href=certificate.url, target=\"_blank\")= certificate.name\r\n                      |,&nbsp;\r\n                    else\r\n                      |#{certificate.name + ', '}\r\n                  |#{certificate.issuer}\r\n\r\n                p.text-muted\r\n                  small\r\n                    |Issued on: #{certificate.date}\r\n","pug\\background\\awards.pug":"unless _.isEmpty(resume.awards)\r\n  .detail#awards\r\n    .icon\r\n      i.fs-lg.icon-trophy\r\n      span.mobile-title Awards\r\n\r\n    .info\r\n      h4.title.text-uppercase Awards\r\n\r\n      .content\r\n        ul.list-unstyled.clear-margin\r\n          each award in resume.awards\r\n            li.card.card-nested\r\n              .content\r\n                p.clear-margin(itemprop=\"award\")\r\n                  strong= award.title + \" \"\r\n                  |,&nbsp;#{award.awarder}\r\n\r\n                p.text-muted\r\n                  small\r\n                    |Awarded on: #{award.date}\r\n\r\n                .mop-wrapper!= award.summary\r\n","pug\\background\\volunteer-work.pug":"unless _.isEmpty(resume.volunteer)\r\n  .detail#volunteer-work\r\n    .icon\r\n      i.fs-lg.icon-child\r\n      span.mobile-title Volunteer Work\r\n\r\n    .info\r\n      h4.title.text-uppercase Volunteer Work\r\n\r\n      .content\r\n        ul.list-unstyled.clear-margin\r\n          each volunteer_info in resume.volunteer\r\n            li.card.card-nested\r\n              .content\r\n                p.clear-margin.relative\r\n                  if !volunteer_info.endDate\r\n                    i.icon-circle.current-event(\r\n                      rel=\"tooltip\",\r\n                      title=\"Currently Volunteering\",\r\n                      data-placement=\"left\"\r\n                    )\r\n\r\n                  strong= volunteer_info.position + ', '\r\n                  if volunteer_info.website\r\n                    a(href=volunteer_info.website, target=\"_blank\")= volunteer_info.organization\r\n                  else\r\n                    |#{volunteer_info.organization}\r\n\r\n                p.text-muted\r\n                  small\r\n                    |#{volunteer_info.startDate} - #{volunteer_info.endDate || 'Present'}\r\n\r\n                .mop-wrapper!= volunteer_info.summary\r\n\r\n                unless _.isEmpty(volunteer_info.highlights)\r\n                  ul\r\n                    each highlight in volunteer_info.highlights\r\n                      li.mop-wrapper!= highlight\r\n","pug\\background\\publications.pug":"\r\nunless _.isEmpty(resume.publications)\r\n  .detail#publications\r\n    .icon\r\n      i.fs-lg.icon-newspaper\r\n      span.mobile-title Publications\r\n\r\n    .info\r\n      h4.title.text-uppercase Publications\r\n\r\n      .content\r\n        ul.list-unstyled.clear-margin\r\n          each publication in resume.publications\r\n            li.card.card-nested\r\n              .content\r\n                p.clear-margin\r\n                  strong\r\n                    if publication.url\r\n                      a(href=publication.url, target=\"_blank\")= publication.name\r\n                      |&nbsp;,&nbsp;\r\n                    else\r\n                      |#{publication.name + ', '}\r\n                  |#{publication.publisher}\r\n\r\n                p.text-muted\r\n                  small= 'Published on: ' + publication.releaseDate\r\n\r\n                .mop-wrapper!= publication.summary\r\n","pug\\background\\interests.pug":"unless _.isEmpty(resume.interests)\r\n  .detail#interests\r\n    .icon\r\n      i.fs-lg.icon-heart\r\n      span.mobile-title Interests\r\n\r\n    .info\r\n      h4.title.text-uppercase Interests\r\n\r\n      .content\r\n        ul.list-unstyled.clear-margin\r\n          each interest in resume.interests\r\n            li.card.card-nested\r\n              p\r\n                strong= interest.name\r\n\r\n              unless _.isEmpty(interest.keywords)\r\n                .space-top.labels\r\n                  each keyword in interest.keywords\r\n                    span.label.label-keyword= keyword\r\n","pug\\background\\references.pug":"unless _.isEmpty(resume.references)\r\n  .detail#references\r\n    .icon\r\n      i.fs-lg.icon-thumbs-up\r\n      span.mobile-title References\r\n\r\n    .info\r\n      h4.title.text-uppercase References\r\n\r\n      .content\r\n        ul.list-unstyled.clear-margin\r\n          each reference_info in resume.references\r\n            li.card.card-nested\r\n              if reference_info.website\r\n                a(href=reference_info.website, target=\"_blank\")= reference_info.name\r\n              else\r\n                |#{reference_info.name}\r\n\r\n              blockquote.quote\r\n                .mop-wrapper!= reference_info.reference\r\n","pug\\scripts.pug":"script(src=\"https:\u002F\u002Fajax.googleapis.com\u002Fajax\u002Flibs\u002Fjquery\u002F1.11.0\u002Fjquery.min.js\")\r\nscript(src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Ftwitter-bootstrap\u002F3.3.6\u002Fjs\u002Fbootstrap.min.js\")\r\n\r\nscript.\r\n  $(function () {\r\n    var toggleFloatingMenu = function() {\r\n      $( '.js-floating-nav' ).toggleClass( 'is-visible' );\r\n      $( '.js-floating-nav-trigger' ).toggleClass( 'is-open' );\r\n    };\r\n\r\n    $( \".background-card\" ).css( \"min-height\", window.screen.availHeight + \"px\" );\r\n    $( \"[data-toggle=tooltip]\" ).tooltip();\r\n    $( '.js-floating-nav-trigger' ).on( 'click', function(e) {\r\n      e.preventDefault();\r\n      toggleFloatingMenu();\r\n    });\r\n    $( '.js-floating-nav a' ).on( 'click', toggleFloatingMenu );\r\n\r\n    $('.inner').on('click', function() {\r\n      window.print();\r\n    })\r\n\r\n    $(\"#remaining-profiles\").on('show.bs.collapse', function() {\r\n      $( '.js-profiles-collapse \u003E i' )\r\n        .removeClass( 'icon-chevron-down' )\r\n        .addClass( 'icon-chevron-up' );\r\n    });\r\n\r\n    $(\"#remaining-profiles\").on('hidden.bs.collapse', function() {\r\n      $( '.js-profiles-collapse \u003E i' )\r\n        .removeClass( 'icon-chevron-up' )\r\n        .addClass( 'icon-chevron-down' );\r\n    });\r\n  });\r\n\r\nscript.\r\n  WebFontConfig = {\r\n    google: { families: [ 'Lato:300,400,700:latin' ] }\r\n  };\r\n  (function() {\r\n    var wf = document.createElement('script');\r\n    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +\r\n      ':\u002F\u002Fajax.googleapis.com\u002Fajax\u002Flibs\u002Fwebfont\u002F1\u002Fwebfont.js';\r\n    wf.type = 'text\u002Fjavascript';\r\n    wf.async = 'true';\r\n    var s = document.getElementsByTagName('script')[0];\r\n    s.parentNode.insertBefore(wf, s);\r\n  })();\r\n"};
;var locals_for_with = (locals || {});(function (_, css, floating_nav_items, resume) {;pug_debug_line = 1;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 2;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Chtml lang=\"en\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 4;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Cmeta charset=\"utf-8\"\u002F\u003E";
;pug_debug_line = 5;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Cmeta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"\u002F\u003E";
;pug_debug_line = 6;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\"\u002F\u003E";
;pug_debug_line = 7;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Ctitle\u003E";
;pug_debug_line = 7;pug_debug_filename = "index.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = resume.basics.name) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E";
;pug_debug_line = 1;pug_debug_filename = "pug\\stylesheets.pug";
pug_html = pug_html + "\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Fmaxcdn.bootstrapcdn.com\u002Fbootstrap\u002F3.3.6\u002Fcss\u002Fbootstrap.min.css\"\u002F\u003E";
;pug_debug_line = 2;pug_debug_filename = "pug\\stylesheets.pug";
pug_html = pug_html + "\u003Cstyle\u003E";
;pug_debug_line = 2;pug_debug_filename = "pug\\stylesheets.pug";
pug_html = pug_html + (null == (pug_interp = css) ? "" : pug_interp) + "\u003C\u002Fstyle\u003E\u003C\u002Fhead\u003E";
;pug_debug_line = 10;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Cbody" + (pug_attr("itemscope", true, true, false)+" itemtype=\"http:\u002F\u002Fschema.org\u002FPerson\"") + "\u003E";
;pug_debug_line = 11;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Cdiv class=\"container-fluid\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Cdiv class=\"row main clearfix\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "pug\\floating-nav.pug";
pug_mixins["make_nav_link"] = pug_interp = function(nav_item){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "pug\\floating-nav.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\\floating-nav.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", "#" + nav_item.target, true, false)) + "\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\\floating-nav.pug";
pug_html = pug_html + "\u003Ci" + (pug_attr("class", pug_classes(["mr-10",'icon-' + nav_item.icon], [false,true]), false, false)) + "\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\floating-nav.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = nav_item.label) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
};
;pug_debug_line = 7;pug_debug_filename = "pug\\floating-nav.pug";
pug_html = pug_html + "\u003Ca class=\"js-floating-nav-trigger floating-nav-trigger\" href=\"#\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\\floating-nav.pug";
pug_html = pug_html + "\u003Ci class=\"icon-bars\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 9;pug_debug_filename = "pug\\floating-nav.pug";
pug_html = pug_html + "\u003Cspan class=\"close-icon\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "pug\\floating-nav.pug";
pug_html = pug_html + "&times;\u003C\u002Fspan\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\\floating-nav.pug";
pug_html = pug_html + "\u003Cnav class=\"floating-nav js-floating-nav\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "pug\\floating-nav.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "pug\\floating-nav.pug";
// iterate floating_nav_items
;(function(){
  var $$obj = floating_nav_items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var nav_item = $$obj[pug_index0];
;pug_debug_line = 14;pug_debug_filename = "pug\\floating-nav.pug";
pug_mixins["make_nav_link"](nav_item);
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var nav_item = $$obj[pug_index0];
;pug_debug_line = 14;pug_debug_filename = "pug\\floating-nav.pug";
pug_mixins["make_nav_link"](nav_item);
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fnav\u003E";
;pug_debug_line = 1;pug_debug_filename = "pug\\profile-card.pug";
pug_mixins["profile_card_detail"] = pug_interp = function(icon, info, itemprop, icon_title){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan" + (" class=\"icon\""+pug_attr("title", icon_title, true, false)) + "\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Ci" + (pug_attr("class", pug_classes(["icon","fs-lg",icon], [false,false,true]), false, false)) + "\u003E\u003C\u002Fi\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan" + (" class=\"info\""+pug_attr("itemprop", itemprop, true, false)) + "\u003E";
;pug_debug_line = 6;pug_debug_filename = "pug\\profile-card.pug";
if (block) {
;pug_debug_line = 7;pug_debug_filename = "pug\\profile-card.pug";
block && block();
}
else {
;pug_debug_line = 9;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = info) ? "" : pug_interp));
}
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 11;pug_debug_filename = "pug\\profile-card.pug";
pug_mixins["render_links"] = pug_interp = function(profiles){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 12;pug_debug_filename = "pug\\profile-card.pug";
// iterate profiles
;(function(){
  var $$obj = profiles;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var profile = $$obj[pug_index1];
;pug_debug_line = 13;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("class", pug_classes(["fs-2x","social-link","link-" + profile.label + " icon-" + profile.label], [false,false,true]), false, false)+pug_attr("href", profile.url, true, false)+" target=\"_blank\" data-toggle=\"tooltip\""+pug_attr("title", resume.basics.name + " on " + profile.network, true, false)) + "\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\\profile-card.pug";
if (profile.network.toLowerCase() == 'meetup') {
;pug_debug_line = 20;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path2\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 21;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path3\"\u003E\u003C\u002Fspan\u003E";
}
;pug_debug_line = 22;pug_debug_filename = "pug\\profile-card.pug";
if (profile.network.toLowerCase() == 'gitlab') {
;pug_debug_line = 23;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path1\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path2\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path3\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 26;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path4\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 27;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path5\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path6\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 29;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path7\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path8\"\u003E\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003C\u002Fa\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var profile = $$obj[pug_index1];
;pug_debug_line = 13;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("class", pug_classes(["fs-2x","social-link","link-" + profile.label + " icon-" + profile.label], [false,false,true]), false, false)+pug_attr("href", profile.url, true, false)+" target=\"_blank\" data-toggle=\"tooltip\""+pug_attr("title", resume.basics.name + " on " + profile.network, true, false)) + "\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\\profile-card.pug";
if (profile.network.toLowerCase() == 'meetup') {
;pug_debug_line = 20;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path2\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 21;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path3\"\u003E\u003C\u002Fspan\u003E";
}
;pug_debug_line = 22;pug_debug_filename = "pug\\profile-card.pug";
if (profile.network.toLowerCase() == 'gitlab') {
;pug_debug_line = 23;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path1\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path2\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path3\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 26;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path4\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 27;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path5\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path6\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 29;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path7\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path8\"\u003E\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003C\u002Fa\u003E";
    }
  }
}).call(this);

};
;pug_debug_line = 32;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Csection class=\"col-md-3 card-wrapper profile-card-wrapper affix\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cdiv class=\"card profile-card\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"profile-pic-container\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-pic\"\u003E";
;pug_debug_line = 36;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cimg" + (" class=\"media-object img-circle center-block\""+" data-src=\"holder.js\u002F100x100\""+pug_attr("alt", resume.basics.name, true, false)+pug_attr("src", resume.basics.picture, true, false)+" itemprop=\"image\"") + "\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 42;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cdiv class=\"name-and-profession text-center\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Ch3 itemprop=\"name\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cb\u003E";
;pug_debug_line = 43;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = resume.basics.name) ? "" : pug_interp)) + "\u003C\u002Fb\u003E\u003C\u002Fh3\u003E";
;pug_debug_line = 44;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Ch5 class=\"text-muted\" itemprop=\"jobTitle\"\u003E";
;pug_debug_line = 44;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = resume.basics.label) ? "" : pug_interp)) + "\u003C\u002Fh5\u003E\u003C\u002Fdiv\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 46;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Chr\u002F\u003E";
;pug_debug_line = 48;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cdiv class=\"contact-details clearfix\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "pug\\profile-card.pug";
if (resume.basics.computed_location) {
;pug_debug_line = 50;pug_debug_filename = "pug\\profile-card.pug";
pug_mixins["profile_card_detail"]("icon-location", resume.basics.computed_location, null, 'My current location');
}
;pug_debug_line = 51;pug_debug_filename = "pug\\profile-card.pug";
if (resume.basics.phone) {
;pug_debug_line = 52;pug_debug_filename = "pug\\profile-card.pug";
pug_mixins["profile_card_detail"]("icon-phone", resume.basics.phone, "telephone");
}
;pug_debug_line = 53;pug_debug_filename = "pug\\profile-card.pug";
if (resume.basics.email) {
;pug_debug_line = 54;pug_debug_filename = "pug\\profile-card.pug";
pug_mixins["profile_card_detail"].call({
block: function(){
;pug_debug_line = 55;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Ca" + (" class=\"link-disguise\""+pug_attr("href", "mailto:" + resume.basics.email, true, false)+" itemprop=\"email\"") + "\u003E";
;pug_debug_line = 55;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = resume.basics.email) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
}, "icon-mail");
}
;pug_debug_line = 56;pug_debug_filename = "pug\\profile-card.pug";
if (resume.basics.website) {
;pug_debug_line = 57;pug_debug_filename = "pug\\profile-card.pug";
pug_mixins["profile_card_detail"].call({
block: function(){
;pug_debug_line = 58;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", resume.basics.website, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 58;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = resume.basics.website) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
}, "icon-link");
}
;pug_debug_line = 59;pug_debug_filename = "pug\\profile-card.pug";
if (resume.basics.languages) {
;pug_debug_line = 60;pug_debug_filename = "pug\\profile-card.pug";
pug_mixins["profile_card_detail"]('icon-language', resume.basics.languages, null, 'Languages I speak');
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 61;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Chr\u002F\u003E";
;pug_debug_line = 62;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cdiv class=\"download-btn\"\u003E";
;pug_debug_line = 62;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + " ";
;pug_debug_line = 63;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cbutton class=\"btn btn-default inner\"\u003E";
;pug_debug_line = 66;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"info\"\u003E";
;pug_debug_line = 66;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "Print\u002FExport this CV\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 67;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Chr\u002F\u003E";
;pug_debug_line = 69;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cdiv class=\"social-links text-center\"\u003E";
;pug_debug_line = 70;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 71;pug_debug_filename = "pug\\profile-card.pug";
pug_mixins["render_links"](resume.basics.top_five_profiles);
;pug_debug_line = 73;pug_debug_filename = "pug\\profile-card.pug";
if (resume.basics.remaining_profiles.length > 0) {
;pug_debug_line = 74;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cbutton class=\"btn btn-default btn-sm btn-circle-sm pull-right js-profiles-collapse\" data-toggle=\"collapse\" data-target=\"#remaining-profiles\"\u003E";
;pug_debug_line = 77;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Ci class=\"icon-chevron-down fs-lg\"\u003E\u003C\u002Fi\u003E\u003C\u002Fbutton\u003E";
;pug_debug_line = 79;pug_debug_filename = "pug\\profile-card.pug";
pug_html = pug_html + "\u003Cdiv class=\"collapse text-left\" id=\"remaining-profiles\"\u003E";
;pug_debug_line = 80;pug_debug_filename = "pug\\profile-card.pug";
pug_mixins["render_links"](resume.basics.remaining_profiles);
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";
;pug_debug_line = 1;pug_debug_filename = "pug\\background-card.pug";
pug_html = pug_html + "\u003Csection class=\"col-md-9 card-wrapper pull-right\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "pug\\background-card.pug";
pug_html = pug_html + "\u003Cdiv class=\"card background-card\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\\background-card.pug";
pug_html = pug_html + "\u003Ch4 class=\"text-uppercase\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\\background-card.pug";
pug_html = pug_html + "Background\u003C\u002Fh4\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\\background-card.pug";
pug_html = pug_html + "\u003Chr\u002F\u003E";
;pug_debug_line = 6;pug_debug_filename = "pug\\background-card.pug";
pug_html = pug_html + "\u003Cdiv class=\"background-details\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "pug\\background\\about.pug";
if (!(_.isEmpty(resume.basics.summary))) {
;pug_debug_line = 2;pug_debug_filename = "pug\\background\\about.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"about\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\\background\\about.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\\background\\about.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-board\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\background\\about.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\background\\about.pug";
pug_html = pug_html + "About\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 6;pug_debug_filename = "pug\\background\\about.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\\background\\about.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\\background\\about.pug";
pug_html = pug_html + "About\u003C\u002Fh4\u003E";
;pug_debug_line = 9;pug_debug_filename = "pug\\background\\about.pug";
pug_html = pug_html + "\u003Cdiv class=\"card card-nested\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\\background\\about.pug";
pug_html = pug_html + "\u003Cdiv class=\"content mop-wrapper\" itemprop=\"description\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\\background\\about.pug";
pug_html = pug_html + (null == (pug_interp = resume.basics.summary) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 1;pug_debug_filename = "pug\\background\\work-experience.pug";
if (!(_.isEmpty(resume.work))) {
;pug_debug_line = 2;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"work-experience\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-office\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "Work Experience\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "Work Experience\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled clear-margin\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\\background\\work-experience.pug";
// iterate resume.work
;(function(){
  var $$obj = resume.work;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var experience = $$obj[pug_index2];
;pug_debug_line = 12;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested clearfix\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin relative\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\work-experience.pug";
if (!experience.endDate) {
;pug_debug_line = 16;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Ci class=\"icon-circle current-event\" rel=\"tooltip\" title=\"Currently Working\" data-placement=\"left\"\u003E\u003C\u002Fi\u003E";
}
;pug_debug_line = 21;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 21;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.position) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 22;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + ",&nbsp;";
;pug_debug_line = 23;pug_debug_filename = "pug\\background\\work-experience.pug";
if (experience.url) {
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", experience.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
else {
;pug_debug_line = 26;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.name) ? "" : pug_interp));
}
pug_html = pug_html + "\u003C\u002Fp\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cspan class=\"space-right\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.startDate) ? "" : pug_interp));
;pug_debug_line = 31;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + " - ";
;pug_debug_line = 31;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.endDate || 'Present') ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
;pug_debug_line = 33;pug_debug_filename = "pug\\background\\work-experience.pug";
if (experience.duration) {
;pug_debug_line = 34;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Ci class=\"icon-clock mr-5\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 36;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.duration) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 38;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper space-bottom\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + (null == (pug_interp = experience.summary) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 40;pug_debug_filename = "pug\\background\\work-experience.pug";
if (!(_.isEmpty(experience.highlights))) {
;pug_debug_line = 41;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 42;pug_debug_filename = "pug\\background\\work-experience.pug";
// iterate experience.highlights
;(function(){
  var $$obj = experience.highlights;
  if ('number' == typeof $$obj.length) {
      for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
        var highlight = $$obj[pug_index3];
;pug_debug_line = 43;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index3 in $$obj) {
      $$l++;
      var highlight = $$obj[pug_index3];
;pug_debug_line = 43;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var experience = $$obj[pug_index2];
;pug_debug_line = 12;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested clearfix\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin relative\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\work-experience.pug";
if (!experience.endDate) {
;pug_debug_line = 16;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Ci class=\"icon-circle current-event\" rel=\"tooltip\" title=\"Currently Working\" data-placement=\"left\"\u003E\u003C\u002Fi\u003E";
}
;pug_debug_line = 21;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 21;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.position) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 22;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + ",&nbsp;";
;pug_debug_line = 23;pug_debug_filename = "pug\\background\\work-experience.pug";
if (experience.url) {
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", experience.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
else {
;pug_debug_line = 26;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.name) ? "" : pug_interp));
}
pug_html = pug_html + "\u003C\u002Fp\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cspan class=\"space-right\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.startDate) ? "" : pug_interp));
;pug_debug_line = 31;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + " - ";
;pug_debug_line = 31;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.endDate || 'Present') ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
;pug_debug_line = 33;pug_debug_filename = "pug\\background\\work-experience.pug";
if (experience.duration) {
;pug_debug_line = 34;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Ci class=\"icon-clock mr-5\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 36;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.duration) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 38;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper space-bottom\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + (null == (pug_interp = experience.summary) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 40;pug_debug_filename = "pug\\background\\work-experience.pug";
if (!(_.isEmpty(experience.highlights))) {
;pug_debug_line = 41;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 42;pug_debug_filename = "pug\\background\\work-experience.pug";
// iterate experience.highlights
;(function(){
  var $$obj = experience.highlights;
  if ('number' == typeof $$obj.length) {
      for (var pug_index4 = 0, $$l = $$obj.length; pug_index4 < $$l; pug_index4++) {
        var highlight = $$obj[pug_index4];
;pug_debug_line = 43;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index4 in $$obj) {
      $$l++;
      var highlight = $$obj[pug_index4];
;pug_debug_line = 43;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "pug\\background\\work-experience.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 1;pug_debug_filename = "pug\\background\\projects-experience.pug";
if (!(_.isEmpty(resume.projects))) {
;pug_debug_line = 2;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"projects-experience\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-code\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "Projects Experience\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "Projects Experience\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled clear-margin\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\\background\\projects-experience.pug";
// iterate resume.projects
;(function(){
  var $$obj = resume.projects;
  if ('number' == typeof $$obj.length) {
      for (var pug_index5 = 0, $$l = $$obj.length; pug_index5 < $$l; pug_index5++) {
        var project = $$obj[pug_index5];
;pug_debug_line = 12;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested clearfix\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin relative\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\projects-experience.pug";
if (!project.endDate) {
;pug_debug_line = 16;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Ci class=\"icon-circle current-event\" rel=\"tooltip\" title=\"Currently Working\" data-placement=\"left\"\u003E\u003C\u002Fi\u003E";
}
;pug_debug_line = 21;pug_debug_filename = "pug\\background\\projects-experience.pug";
if (project.url) {
;pug_debug_line = 22;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", project.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.name) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E\u003C\u002Fa\u003E";
}
else {
;pug_debug_line = 25;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.name) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E";
}
;pug_debug_line = 26;pug_debug_filename = "pug\\background\\projects-experience.pug";
if (project.entity) {
;pug_debug_line = 27;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + ",&nbsp;";
;pug_debug_line = 28;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.entity) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003C\u002Fp\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 32;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cspan class=\"space-right\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.startDate) ? "" : pug_interp));
;pug_debug_line = 33;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + " - ";
;pug_debug_line = 33;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.endDate || 'Present') ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\\background\\projects-experience.pug";
if (project.duration) {
;pug_debug_line = 36;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 37;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Ci class=\"icon-clock mr-5\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 38;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.duration) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 40;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper space-bottom\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + (null == (pug_interp = project.description) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 42;pug_debug_filename = "pug\\background\\projects-experience.pug";
if (!(_.isEmpty(project.highlights))) {
;pug_debug_line = 43;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 44;pug_debug_filename = "pug\\background\\projects-experience.pug";
// iterate project.highlights
;(function(){
  var $$obj = project.highlights;
  if ('number' == typeof $$obj.length) {
      for (var pug_index6 = 0, $$l = $$obj.length; pug_index6 < $$l; pug_index6++) {
        var highlight = $$obj[pug_index6];
;pug_debug_line = 45;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index6 in $$obj) {
      $$l++;
      var highlight = $$obj[pug_index6];
;pug_debug_line = 45;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index5 in $$obj) {
      $$l++;
      var project = $$obj[pug_index5];
;pug_debug_line = 12;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested clearfix\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin relative\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\projects-experience.pug";
if (!project.endDate) {
;pug_debug_line = 16;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Ci class=\"icon-circle current-event\" rel=\"tooltip\" title=\"Currently Working\" data-placement=\"left\"\u003E\u003C\u002Fi\u003E";
}
;pug_debug_line = 21;pug_debug_filename = "pug\\background\\projects-experience.pug";
if (project.url) {
;pug_debug_line = 22;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", project.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.name) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E\u003C\u002Fa\u003E";
}
else {
;pug_debug_line = 25;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.name) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E";
}
;pug_debug_line = 26;pug_debug_filename = "pug\\background\\projects-experience.pug";
if (project.entity) {
;pug_debug_line = 27;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + ",&nbsp;";
;pug_debug_line = 28;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.entity) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003C\u002Fp\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 32;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cspan class=\"space-right\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.startDate) ? "" : pug_interp));
;pug_debug_line = 33;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + " - ";
;pug_debug_line = 33;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.endDate || 'Present') ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\\background\\projects-experience.pug";
if (project.duration) {
;pug_debug_line = 36;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 37;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Ci class=\"icon-clock mr-5\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 38;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.duration) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 40;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper space-bottom\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + (null == (pug_interp = project.description) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 42;pug_debug_filename = "pug\\background\\projects-experience.pug";
if (!(_.isEmpty(project.highlights))) {
;pug_debug_line = 43;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 44;pug_debug_filename = "pug\\background\\projects-experience.pug";
// iterate project.highlights
;(function(){
  var $$obj = project.highlights;
  if ('number' == typeof $$obj.length) {
      for (var pug_index7 = 0, $$l = $$obj.length; pug_index7 < $$l; pug_index7++) {
        var highlight = $$obj[pug_index7];
;pug_debug_line = 45;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index7 in $$obj) {
      $$l++;
      var highlight = $$obj[pug_index7];
;pug_debug_line = 45;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "pug\\background\\projects-experience.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 1;pug_debug_filename = "pug\\background\\skills.pug";
if (!(_.isEmpty(resume.skills))) {
;pug_debug_line = 2;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"skills\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-tools\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "Skills\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "Skills\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled clear-margin\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "pug\\background\\skills.pug";
// iterate resume.skills
;(function(){
  var $$obj = resume.skills;
  if ('number' == typeof $$obj.length) {
      for (var pug_index8 = 0, $$l = $$obj.length; pug_index8 < $$l; pug_index8++) {
        var skill = $$obj[pug_index8];
;pug_debug_line = 13;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested card-skills\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\\background\\skills.pug";
if (skill.display_progress_bar) {
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"skill-level\""+" data-toggle=\"tooltip\""+pug_attr("title", skill.level, true, false)+" data-placement=\"left\"") + "\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["skill-progress",skill.skill_class], [false,true]), false, false)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 18;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cdiv class=\"skill-info\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = skill.name) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 21;pug_debug_filename = "pug\\background\\skills.pug";
if (!(_.isEmpty(skill.keywords))) {
;pug_debug_line = 22;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cdiv class=\"space-top labels\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\\background\\skills.pug";
// iterate skill.keywords
;(function(){
  var $$obj = skill.keywords;
  if ('number' == typeof $$obj.length) {
      for (var pug_index9 = 0, $$l = $$obj.length; pug_index9 < $$l; pug_index9++) {
        var keyword = $$obj[pug_index9];
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + (null == (pug_interp = keyword) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index9 in $$obj) {
      $$l++;
      var keyword = $$obj[pug_index9];
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + (null == (pug_interp = keyword) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index8 in $$obj) {
      $$l++;
      var skill = $$obj[pug_index8];
;pug_debug_line = 13;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested card-skills\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\\background\\skills.pug";
if (skill.display_progress_bar) {
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"skill-level\""+" data-toggle=\"tooltip\""+pug_attr("title", skill.level, true, false)+" data-placement=\"left\"") + "\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["skill-progress",skill.skill_class], [false,true]), false, false)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 18;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cdiv class=\"skill-info\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = skill.name) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 21;pug_debug_filename = "pug\\background\\skills.pug";
if (!(_.isEmpty(skill.keywords))) {
;pug_debug_line = 22;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cdiv class=\"space-top labels\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\\background\\skills.pug";
// iterate skill.keywords
;(function(){
  var $$obj = skill.keywords;
  if ('number' == typeof $$obj.length) {
      for (var pug_index10 = 0, $$l = $$obj.length; pug_index10 < $$l; pug_index10++) {
        var keyword = $$obj[pug_index10];
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + (null == (pug_interp = keyword) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index10 in $$obj) {
      $$l++;
      var keyword = $$obj[pug_index10];
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\skills.pug";
pug_html = pug_html + (null == (pug_interp = keyword) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 1;pug_debug_filename = "pug\\background\\education.pug";
if (!(_.isEmpty(resume.education))) {
;pug_debug_line = 2;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"education\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-graduation-cap\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "Education\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "Education\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled clear-margin\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "pug\\background\\education.pug";
// iterate resume.education
;(function(){
  var $$obj = resume.education;
  if ('number' == typeof $$obj.length) {
      for (var pug_index11 = 0, $$l = $$obj.length; pug_index11 < $$l; pug_index11++) {
        var education_info = $$obj[pug_index11];
;pug_debug_line = 13;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin relative\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\\background\\education.pug";
if (!education_info.endDate) {
;pug_debug_line = 17;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Ci class=\"icon-circle current-event\" rel=\"tooltip\" title=\"Currently Pursuing\" data-placement=\"left\"\u003E\u003C\u002Fi\u003E";
}
;pug_debug_line = 23;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.area) ? "" : pug_interp));
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + ", ";
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.studyType) ? "" : pug_interp));
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + ",&nbsp;\u003C\u002Fstrong\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.institution) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 27;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cp" + (pug_attr("class", pug_classes(["text-muted",!education_info.gpa && _.isEmpty(education_info.courses) ? 'clear-margin' : ''], [false,true]), false, false)) + "\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 29;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.startDate) ? "" : pug_interp));
;pug_debug_line = 29;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + " - ";
;pug_debug_line = 29;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.endDate || 'Present') ? "" : pug_interp)) + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Ci\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.gpa) ? "" : pug_interp)) + "\u003C\u002Fi\u003E";
;pug_debug_line = 32;pug_debug_filename = "pug\\background\\education.pug";
if (!(_.isEmpty(education_info.courses))) {
;pug_debug_line = 33;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cdiv class=\"space-top labels\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "pug\\background\\education.pug";
// iterate education_info.courses
;(function(){
  var $$obj = education_info.courses;
  if ('number' == typeof $$obj.length) {
      for (var pug_index12 = 0, $$l = $$obj.length; pug_index12 < $$l; pug_index12++) {
        var course = $$obj[pug_index12];
;pug_debug_line = 35;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + (null == (pug_interp = course) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index12 in $$obj) {
      $$l++;
      var course = $$obj[pug_index12];
;pug_debug_line = 35;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + (null == (pug_interp = course) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index11 in $$obj) {
      $$l++;
      var education_info = $$obj[pug_index11];
;pug_debug_line = 13;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin relative\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\\background\\education.pug";
if (!education_info.endDate) {
;pug_debug_line = 17;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Ci class=\"icon-circle current-event\" rel=\"tooltip\" title=\"Currently Pursuing\" data-placement=\"left\"\u003E\u003C\u002Fi\u003E";
}
;pug_debug_line = 23;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.area) ? "" : pug_interp));
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + ", ";
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.studyType) ? "" : pug_interp));
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + ",&nbsp;\u003C\u002Fstrong\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.institution) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 27;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cp" + (pug_attr("class", pug_classes(["text-muted",!education_info.gpa && _.isEmpty(education_info.courses) ? 'clear-margin' : ''], [false,true]), false, false)) + "\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 29;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.startDate) ? "" : pug_interp));
;pug_debug_line = 29;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + " - ";
;pug_debug_line = 29;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.endDate || 'Present') ? "" : pug_interp)) + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Ci\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.gpa) ? "" : pug_interp)) + "\u003C\u002Fi\u003E";
;pug_debug_line = 32;pug_debug_filename = "pug\\background\\education.pug";
if (!(_.isEmpty(education_info.courses))) {
;pug_debug_line = 33;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cdiv class=\"space-top labels\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "pug\\background\\education.pug";
// iterate education_info.courses
;(function(){
  var $$obj = education_info.courses;
  if ('number' == typeof $$obj.length) {
      for (var pug_index13 = 0, $$l = $$obj.length; pug_index13 < $$l; pug_index13++) {
        var course = $$obj[pug_index13];
;pug_debug_line = 35;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + (null == (pug_interp = course) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index13 in $$obj) {
      $$l++;
      var course = $$obj[pug_index13];
;pug_debug_line = 35;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\\background\\education.pug";
pug_html = pug_html + (null == (pug_interp = course) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 1;pug_debug_filename = "pug\\background\\certificates.pug";
if (!(_.isEmpty(resume.certificates))) {
;pug_debug_line = 2;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"certificates\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-profile\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "Certificates\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "Certificates\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled clear-margin\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "pug\\background\\certificates.pug";
// iterate resume.certificates
;(function(){
  var $$obj = resume.certificates;
  if ('number' == typeof $$obj.length) {
      for (var pug_index14 = 0, $$l = $$obj.length; pug_index14 < $$l; pug_index14++) {
        var certificate = $$obj[pug_index14];
;pug_debug_line = 13;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin\" itemprop=\"certificate\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 17;pug_debug_filename = "pug\\background\\certificates.pug";
if (certificate.url) {
;pug_debug_line = 18;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", certificate.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 18;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = certificate.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + ",&nbsp;";
}
else {
;pug_debug_line = 21;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = certificate.name + ', ') ? "" : pug_interp));
}
pug_html = pug_html + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 22;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = certificate.issuer) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 26;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "Issued on: ";
;pug_debug_line = 26;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = certificate.date) ? "" : pug_interp)) + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index14 in $$obj) {
      $$l++;
      var certificate = $$obj[pug_index14];
;pug_debug_line = 13;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin\" itemprop=\"certificate\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 17;pug_debug_filename = "pug\\background\\certificates.pug";
if (certificate.url) {
;pug_debug_line = 18;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", certificate.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 18;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = certificate.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + ",&nbsp;";
}
else {
;pug_debug_line = 21;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = certificate.name + ', ') ? "" : pug_interp));
}
pug_html = pug_html + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 22;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = certificate.issuer) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 26;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + "Issued on: ";
;pug_debug_line = 26;pug_debug_filename = "pug\\background\\certificates.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = certificate.date) ? "" : pug_interp)) + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 1;pug_debug_filename = "pug\\background\\awards.pug";
if (!(_.isEmpty(resume.awards))) {
;pug_debug_line = 2;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"awards\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-trophy\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "Awards\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "Awards\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled clear-margin\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "pug\\background\\awards.pug";
// iterate resume.awards
;(function(){
  var $$obj = resume.awards;
  if ('number' == typeof $$obj.length) {
      for (var pug_index15 = 0, $$l = $$obj.length; pug_index15 < $$l; pug_index15++) {
        var award = $$obj[pug_index15];
;pug_debug_line = 13;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin\" itemprop=\"award\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = award.title + " ") ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 17;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + ",&nbsp;";
;pug_debug_line = 17;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = award.awarder) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 21;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "Awarded on: ";
;pug_debug_line = 21;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = award.date) ? "" : pug_interp)) + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + (null == (pug_interp = award.summary) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index15 in $$obj) {
      $$l++;
      var award = $$obj[pug_index15];
;pug_debug_line = 13;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin\" itemprop=\"award\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = award.title + " ") ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 17;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + ",&nbsp;";
;pug_debug_line = 17;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = award.awarder) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 21;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "Awarded on: ";
;pug_debug_line = 21;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = award.date) ? "" : pug_interp)) + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\\background\\awards.pug";
pug_html = pug_html + (null == (pug_interp = award.summary) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 1;pug_debug_filename = "pug\\background\\volunteer-work.pug";
if (!(_.isEmpty(resume.volunteer))) {
;pug_debug_line = 2;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"volunteer-work\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-child\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "Volunteer Work\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "Volunteer Work\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled clear-margin\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "pug\\background\\volunteer-work.pug";
// iterate resume.volunteer
;(function(){
  var $$obj = resume.volunteer;
  if ('number' == typeof $$obj.length) {
      for (var pug_index16 = 0, $$l = $$obj.length; pug_index16 < $$l; pug_index16++) {
        var volunteer_info = $$obj[pug_index16];
;pug_debug_line = 13;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin relative\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\\background\\volunteer-work.pug";
if (!volunteer_info.endDate) {
;pug_debug_line = 17;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Ci class=\"icon-circle current-event\" rel=\"tooltip\" title=\"Currently Volunteering\" data-placement=\"left\"\u003E\u003C\u002Fi\u003E";
}
;pug_debug_line = 23;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = volunteer_info.position + ', ') ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\volunteer-work.pug";
if (volunteer_info.website) {
;pug_debug_line = 25;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", volunteer_info.website, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = volunteer_info.organization) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
else {
;pug_debug_line = 27;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = volunteer_info.organization) ? "" : pug_interp));
}
pug_html = pug_html + "\u003C\u002Fp\u003E";
;pug_debug_line = 29;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 31;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = volunteer_info.startDate) ? "" : pug_interp));
;pug_debug_line = 31;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + " - ";
;pug_debug_line = 31;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = volunteer_info.endDate || 'Present') ? "" : pug_interp)) + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 33;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + (null == (pug_interp = volunteer_info.summary) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\\background\\volunteer-work.pug";
if (!(_.isEmpty(volunteer_info.highlights))) {
;pug_debug_line = 36;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 37;pug_debug_filename = "pug\\background\\volunteer-work.pug";
// iterate volunteer_info.highlights
;(function(){
  var $$obj = volunteer_info.highlights;
  if ('number' == typeof $$obj.length) {
      for (var pug_index17 = 0, $$l = $$obj.length; pug_index17 < $$l; pug_index17++) {
        var highlight = $$obj[pug_index17];
;pug_debug_line = 38;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index17 in $$obj) {
      $$l++;
      var highlight = $$obj[pug_index17];
;pug_debug_line = 38;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index16 in $$obj) {
      $$l++;
      var volunteer_info = $$obj[pug_index16];
;pug_debug_line = 13;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin relative\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\\background\\volunteer-work.pug";
if (!volunteer_info.endDate) {
;pug_debug_line = 17;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Ci class=\"icon-circle current-event\" rel=\"tooltip\" title=\"Currently Volunteering\" data-placement=\"left\"\u003E\u003C\u002Fi\u003E";
}
;pug_debug_line = 23;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = volunteer_info.position + ', ') ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\\background\\volunteer-work.pug";
if (volunteer_info.website) {
;pug_debug_line = 25;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", volunteer_info.website, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = volunteer_info.organization) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
else {
;pug_debug_line = 27;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = volunteer_info.organization) ? "" : pug_interp));
}
pug_html = pug_html + "\u003C\u002Fp\u003E";
;pug_debug_line = 29;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 31;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = volunteer_info.startDate) ? "" : pug_interp));
;pug_debug_line = 31;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + " - ";
;pug_debug_line = 31;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = volunteer_info.endDate || 'Present') ? "" : pug_interp)) + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 33;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + (null == (pug_interp = volunteer_info.summary) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\\background\\volunteer-work.pug";
if (!(_.isEmpty(volunteer_info.highlights))) {
;pug_debug_line = 36;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 37;pug_debug_filename = "pug\\background\\volunteer-work.pug";
// iterate volunteer_info.highlights
;(function(){
  var $$obj = volunteer_info.highlights;
  if ('number' == typeof $$obj.length) {
      for (var pug_index18 = 0, $$l = $$obj.length; pug_index18 < $$l; pug_index18++) {
        var highlight = $$obj[pug_index18];
;pug_debug_line = 38;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index18 in $$obj) {
      $$l++;
      var highlight = $$obj[pug_index18];
;pug_debug_line = 38;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "pug\\background\\volunteer-work.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 2;pug_debug_filename = "pug\\background\\publications.pug";
if (!(_.isEmpty(resume.publications))) {
;pug_debug_line = 3;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"publications\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-newspaper\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 6;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "Publications\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "Publications\u003C\u002Fh4\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled clear-margin\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "pug\\background\\publications.pug";
// iterate resume.publications
;(function(){
  var $$obj = resume.publications;
  if ('number' == typeof $$obj.length) {
      for (var pug_index19 = 0, $$l = $$obj.length; pug_index19 < $$l; pug_index19++) {
        var publication = $$obj[pug_index19];
;pug_debug_line = 14;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 18;pug_debug_filename = "pug\\background\\publications.pug";
if (publication.url) {
;pug_debug_line = 19;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", publication.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = publication.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "&nbsp;,&nbsp;";
}
else {
;pug_debug_line = 22;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = publication.name + ', ') ? "" : pug_interp));
}
pug_html = pug_html + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = publication.publisher) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 26;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = 'Published on: ' + publication.releaseDate) ? "" : pug_interp)) + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + (null == (pug_interp = publication.summary) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index19 in $$obj) {
      $$l++;
      var publication = $$obj[pug_index19];
;pug_debug_line = 14;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 18;pug_debug_filename = "pug\\background\\publications.pug";
if (publication.url) {
;pug_debug_line = 19;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", publication.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = publication.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "&nbsp;,&nbsp;";
}
else {
;pug_debug_line = 22;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = publication.name + ', ') ? "" : pug_interp));
}
pug_html = pug_html + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = publication.publisher) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 26;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = 'Published on: ' + publication.releaseDate) ? "" : pug_interp)) + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\\background\\publications.pug";
pug_html = pug_html + (null == (pug_interp = publication.summary) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 1;pug_debug_filename = "pug\\background\\interests.pug";
if (!(_.isEmpty(resume.interests))) {
;pug_debug_line = 2;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"interests\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-heart\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "Interests\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "Interests\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled clear-margin\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "pug\\background\\interests.pug";
// iterate resume.interests
;(function(){
  var $$obj = resume.interests;
  if ('number' == typeof $$obj.length) {
      for (var pug_index20 = 0, $$l = $$obj.length; pug_index20 < $$l; pug_index20++) {
        var interest = $$obj[pug_index20];
;pug_debug_line = 13;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = interest.name) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 17;pug_debug_filename = "pug\\background\\interests.pug";
if (!(_.isEmpty(interest.keywords))) {
;pug_debug_line = 18;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "\u003Cdiv class=\"space-top labels\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\\background\\interests.pug";
// iterate interest.keywords
;(function(){
  var $$obj = interest.keywords;
  if ('number' == typeof $$obj.length) {
      for (var pug_index21 = 0, $$l = $$obj.length; pug_index21 < $$l; pug_index21++) {
        var keyword = $$obj[pug_index21];
;pug_debug_line = 20;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = keyword) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index21 in $$obj) {
      $$l++;
      var keyword = $$obj[pug_index21];
;pug_debug_line = 20;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = keyword) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index20 in $$obj) {
      $$l++;
      var interest = $$obj[pug_index20];
;pug_debug_line = 13;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = interest.name) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 17;pug_debug_filename = "pug\\background\\interests.pug";
if (!(_.isEmpty(interest.keywords))) {
;pug_debug_line = 18;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "\u003Cdiv class=\"space-top labels\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\\background\\interests.pug";
// iterate interest.keywords
;(function(){
  var $$obj = interest.keywords;
  if ('number' == typeof $$obj.length) {
      for (var pug_index22 = 0, $$l = $$obj.length; pug_index22 < $$l; pug_index22++) {
        var keyword = $$obj[pug_index22];
;pug_debug_line = 20;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = keyword) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index22 in $$obj) {
      $$l++;
      var keyword = $$obj[pug_index22];
;pug_debug_line = 20;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\\background\\interests.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = keyword) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 1;pug_debug_filename = "pug\\background\\references.pug";
if (!(_.isEmpty(resume.references))) {
;pug_debug_line = 2;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"references\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-thumbs-up\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + "References\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + "References\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled clear-margin\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "pug\\background\\references.pug";
// iterate resume.references
;(function(){
  var $$obj = resume.references;
  if ('number' == typeof $$obj.length) {
      for (var pug_index23 = 0, $$l = $$obj.length; pug_index23 < $$l; pug_index23++) {
        var reference_info = $$obj[pug_index23];
;pug_debug_line = 13;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\\background\\references.pug";
if (reference_info.website) {
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", reference_info.website, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = reference_info.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
else {
;pug_debug_line = 17;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = reference_info.name) ? "" : pug_interp));
}
;pug_debug_line = 19;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + "\u003Cblockquote class=\"quote\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + (null == (pug_interp = reference_info.reference) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fblockquote\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index23 in $$obj) {
      $$l++;
      var reference_info = $$obj[pug_index23];
;pug_debug_line = 13;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\\background\\references.pug";
if (reference_info.website) {
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", reference_info.website, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = reference_info.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
else {
;pug_debug_line = 17;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = reference_info.name) ? "" : pug_interp));
}
;pug_debug_line = 19;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + "\u003Cblockquote class=\"quote\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\\background\\references.pug";
pug_html = pug_html + (null == (pug_interp = reference_info.reference) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fblockquote\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 1;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\u003Cscript src=\"https:\u002F\u002Fajax.googleapis.com\u002Fajax\u002Flibs\u002Fjquery\u002F1.11.0\u002Fjquery.min.js\"\u003E\u003C\u002Fscript\u003E";
;pug_debug_line = 2;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\u003Cscript src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Ftwitter-bootstrap\u002F3.3.6\u002Fjs\u002Fbootstrap.min.js\"\u003E\u003C\u002Fscript\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "$(function () {";
;pug_debug_line = 6;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 6;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "  var toggleFloatingMenu = function() {";
;pug_debug_line = 7;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 7;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "    $( '.js-floating-nav' ).toggleClass( 'is-visible' );";
;pug_debug_line = 8;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 8;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "    $( '.js-floating-nav-trigger' ).toggleClass( 'is-open' );";
;pug_debug_line = 9;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 9;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "  };";
;pug_debug_line = 10;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 10;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "";
;pug_debug_line = 11;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 11;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "  $( \".background-card\" ).css( \"min-height\", window.screen.availHeight + \"px\" );";
;pug_debug_line = 12;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 12;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "  $( \"[data-toggle=tooltip]\" ).tooltip();";
;pug_debug_line = 13;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 13;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "  $( '.js-floating-nav-trigger' ).on( 'click', function(e) {";
;pug_debug_line = 14;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 14;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "    e.preventDefault();";
;pug_debug_line = 15;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 15;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "    toggleFloatingMenu();";
;pug_debug_line = 16;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 16;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "  });";
;pug_debug_line = 17;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 17;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "  $( '.js-floating-nav a' ).on( 'click', toggleFloatingMenu );";
;pug_debug_line = 18;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 18;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "";
;pug_debug_line = 19;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 19;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "  $('.inner').on('click', function() {";
;pug_debug_line = 20;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 20;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "    window.print();";
;pug_debug_line = 21;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 21;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "  })";
;pug_debug_line = 22;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 22;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "";
;pug_debug_line = 23;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 23;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "  $(\"#remaining-profiles\").on('show.bs.collapse', function() {";
;pug_debug_line = 24;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 24;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "    $( '.js-profiles-collapse \u003E i' )";
;pug_debug_line = 25;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 25;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "      .removeClass( 'icon-chevron-down' )";
;pug_debug_line = 26;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 26;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "      .addClass( 'icon-chevron-up' );";
;pug_debug_line = 27;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 27;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "  });";
;pug_debug_line = 28;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 28;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "";
;pug_debug_line = 29;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 29;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "  $(\"#remaining-profiles\").on('hidden.bs.collapse', function() {";
;pug_debug_line = 30;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 30;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "    $( '.js-profiles-collapse \u003E i' )";
;pug_debug_line = 31;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 31;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "      .removeClass( 'icon-chevron-up' )";
;pug_debug_line = 32;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 32;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "      .addClass( 'icon-chevron-down' );";
;pug_debug_line = 33;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 33;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "  });";
;pug_debug_line = 34;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 34;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "});";
;pug_debug_line = 35;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 35;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\u003C\u002Fscript\u003E";
;pug_debug_line = 36;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 37;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "WebFontConfig = {";
;pug_debug_line = 38;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 38;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "  google: { families: [ 'Lato:300,400,700:latin' ] }";
;pug_debug_line = 39;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 39;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "};";
;pug_debug_line = 40;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 40;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "(function() {";
;pug_debug_line = 41;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 41;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "  var wf = document.createElement('script');";
;pug_debug_line = 42;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 42;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +";
;pug_debug_line = 43;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 43;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "    ':\u002F\u002Fajax.googleapis.com\u002Fajax\u002Flibs\u002Fwebfont\u002F1\u002Fwebfont.js';";
;pug_debug_line = 44;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 44;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "  wf.type = 'text\u002Fjavascript';";
;pug_debug_line = 45;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 45;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "  wf.async = 'true';";
;pug_debug_line = 46;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 46;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "  var s = document.getElementsByTagName('script')[0];";
;pug_debug_line = 47;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 47;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "  s.parentNode.insertBefore(wf, s);";
;pug_debug_line = 48;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 48;pug_debug_filename = "pug\\scripts.pug";
pug_html = pug_html + "})();\u003C\u002Fscript\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";}.call(this,"_" in locals_for_with?locals_for_with._:typeof _!=="undefined"?_:undefined,"css" in locals_for_with?locals_for_with.css:typeof css!=="undefined"?css:undefined,"floating_nav_items" in locals_for_with?locals_for_with.floating_nav_items:typeof floating_nav_items!=="undefined"?floating_nav_items:undefined,"resume" in locals_for_with?locals_for_with.resume:typeof resume!=="undefined"?resume:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}module.exports = { renderResume: template }; 
