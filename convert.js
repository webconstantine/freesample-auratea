const fs = require('fs');

let raw = fs.readFileSync('public/aura-free-sampling.html');
let htmlContent = raw.toString('utf-8');
if (htmlContent.includes('\u0000')) {
  htmlContent = raw.toString('utf16le');
}

const styleMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/);
let css = styleMatch ? styleMatch[1] : '';

css = css.replace(/--serif:'Marcellus',Georgia,serif;/g, "--serif:var(--font-marcellus),Georgia,serif;");
css = css.replace(/--accent:'Cormorant Garamond',Georgia,serif;/g, "--accent:var(--font-cormorant),Georgia,serif;");
css = css.replace(/--sans:'Jost','Segoe UI',sans-serif;/g, "--sans:var(--font-jost),'Segoe UI',sans-serif;");

fs.writeFileSync('src/app/globals.css', '@import "tailwindcss";\n' + css);

let bodyMatch = htmlContent.match(/<body>([\s\S]*?)<\/body>/i);
let bodyHtml = bodyMatch ? bodyMatch[1] : '';

// Remove other products
const packagesSectionRegex = /(<!-- ============ PACKAGES ============ -->[\s\S]*?<div class="section-head reveal">[\s\S]*?<\/div>)([\s\S]*?)(<\/div>\s*<\/section>)/;
bodyHtml = bodyHtml.replace(packagesSectionRegex, `$1
    <div class="pack-grid" style="grid-template-columns: 1fr; max-width: 320px; margin: 0 auto;">
      <article class="pack-card reveal">
        <div class="pack-img">
          <img src="/products/sample.jpeg" alt="Daily Aura 85 gram pack" loading="lazy">
        </div>
        <div class="pack-body">
          <h3>Daily Aura, 85G</h3>
          <div class="pack-price"><span class="price-now">Free Sample</span></div>
          <button class="btn btn-dark" data-open-drawer data-pack="Daily Aura 85G">Sample This Pack</button>
        </div>
      </article>
    </div>
$3`);

// Replace hero image
bodyHtml = bodyHtml.replace(/<img src="[^"]*" alt="Aura Premium Tea 430 gram pack" loading="eager">/, '<img src="/products/sample.jpeg" alt="Aura Premium Tea Free Sample" loading="eager">');

// Extract script
const scriptMatch = bodyHtml.match(/<script>([\s\S]*?)<\/script>/);
let scriptContent = scriptMatch ? scriptMatch[1] : '';
bodyHtml = bodyHtml.replace(/<script>[\s\S]*?<\/script>/, '');

// Convert void tags
bodyHtml = bodyHtml.replace(/<(img|input|br|hr|source|wbr|track)([^>]*)>/g, (match, tag, attrs) => {
    if (attrs.endsWith('/')) return match;
    return `<${tag}${attrs} />`;
});

// React properties mapping
bodyHtml = bodyHtml.replace(/class=/g, 'className=');
bodyHtml = bodyHtml.replace(/for=/g, 'htmlFor=');
bodyHtml = bodyHtml.replace(/novalidate/gi, 'noValidate');
bodyHtml = bodyHtml.replace(/autocomplete=/gi, 'autoComplete=');

bodyHtml = bodyHtml.replace(/stroke-width/gi, 'strokeWidth');
bodyHtml = bodyHtml.replace(/stroke-linecap/gi, 'strokeLinecap');
bodyHtml = bodyHtml.replace(/stroke-linejoin/gi, 'strokeLinejoin');
bodyHtml = bodyHtml.replace(/font-family/gi, 'fontFamily');
bodyHtml = bodyHtml.replace(/font-size/gi, 'fontSize');
bodyHtml = bodyHtml.replace(/font-weight/gi, 'fontWeight');
bodyHtml = bodyHtml.replace(/letter-spacing/gi, 'letterSpacing');

// Form fixes
bodyHtml = bodyHtml.replace(/ selected>/g, '>');
bodyHtml = bodyHtml.replace(/ checked>/g, ' defaultChecked>');

// Remove HTML comments
bodyHtml = bodyHtml.replace(/<!--[\s\S]*?-->/g, '');

// Style fixes
bodyHtml = bodyHtml.replace(/style="grid-template-columns: 1fr; max-width: 320px; margin: 0 auto;"/g, 'style={{ gridTemplateColumns: "1fr", maxWidth: "320px", margin: "0 auto" }}');
bodyHtml = bodyHtml.replace(/style="display: none;"/g, 'style={{ display: "none" }}');

const pageTsx = `// @ts-nocheck
"use client";
import React, { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    ${scriptContent}
  }, []);

  return (
    <>
      ${bodyHtml}
    </>
  );
}`;

fs.writeFileSync('src/app/page.tsx', pageTsx);
console.log('Conversion script completed.');
