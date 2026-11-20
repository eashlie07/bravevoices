# How to edit this site

Everything on the page is in **`index.html`**. The colours, spacing and fonts are in
**`style.css`**, and you probably never need to touch it.

You can edit `index.html` in any text editor — TextEdit, Notepad, or a free one called
Visual Studio Code, which is what I'd use because it colours the code and can't easily break
the file.

---

## The one rule

Change **words between tags**. Don't change the tags themselves.

```html
<h2>Four afternoons, one show.</h2>
    ↑                        ↑
    tag                      closing tag
```

Everything between `>` and `<` is yours. The bits inside `< >` are structure — that's what
makes it bold or a heading or a link. If you delete one of those, something on the page will
look wrong, but a half-hour of squinting will find it.

A comment looks like this and is never shown on the page:

```html
<!-- ✏️ EDIT: change the dates -->
```

Those are notes to you. You can delete them as you go, or leave them forever.

---

## What you'll actually change each season

Search for **✏️ EDIT** and you'll find every spot, in order down the page.

**1. The class section** (the terracotta band). Six things:

| What | Where |
|---|---|
| Dates in the top bar | `JAN 20 · 22 · 27 · 29` |
| Ages and class name | `BRAVE VOICES MUSICAL THEATER · AGES 7–10` |
| Big headline | `Four afternoons, one show.` |
| Card: dates, time, where, price, deadline | inside `.card-specs` |
| Registration button link | the `href="..."` on the button |
| Bottom small print | `5–15 participants...` |

**2. The registration link.** That long `https://secure.rec1.com/...` address. Leave it as
it is unless Parks & Rec gives you a specific link to the individual class — in which case
swap in theirs. A direct link to the class beats the catalogue every time.

**3. The FAQ.** Copy one whole block to add a question:

```html
<details>
  <summary>Your question here?</summary>
  <p>Your answer here.</p>
</details>
```

**4. The programs list.** Copy or delete a whole `<article class="program-item">` block.
Each one starts with a number (`01`, `02`) — renumber them if you add or remove one, so the
count stays honest.

---

## When there's no class scheduled

Don't leave an old class up, and don't leave the section empty. There's a ready-made
message commented out right below the class card. The instructions for switching to it are
in the code, in the box that starts **DELETE THIS CLASS**.

The point of it: someone lands on the site between seasons, and instead of finding nothing,
they leave their email address. That's how you build a list of parents who want the next
class — which is the thing you've been missing.

---

## The contact form

It works like this: the visitor fills in the boxes, presses Send, and **their own email app
opens** with the message written out and addressed to `eashlie07@gmail.com`. They press send.

Nothing passes through the website. No server, no account, no monthly fee.

The catch, and it's a real one: **it only works if they have an email app set up on their
device.** On a phone with the Gmail app, fine. On a shared library computer, probably not.
That's why the form says so underneath, and why the direct address is printed beside it.

If you'd rather have a proper form that arrives in your inbox from anywhere, use
**Formspree** (free tier, 50 messages a month) or **Netlify Forms**. It's one line changed
in the `<form>` tag plus a confirmation email. Ask me and I'll do it.

To change the address the form writes to, search for `eashlie07@gmail.com` — it appears in
the form's script and in the contact details above it. Change both.

---

## Publishing

You're on Cloudflare Pages. Replace `index.html` and `style.css` in your project, and the
site updates itself in about a minute. Then **look at it on your phone** before you tell
anyone about it.

---

## Two things still to do

**1. Add a real domain.** `bravevoices.pages.dev` undermines everything else. About $12 a
year from Cloudflare or Namecheap, pointed at your Pages project — it takes ten minutes and
it's the difference between "a project" and "a business."

**2. Add photos.** There's a complete photos section sitting in `index.html` commented out,
with a testimonial in it. Put three images in the `imgs` folder, uncomment the section
(select it, Ctrl + /), and swap the filenames. No faces needed — shoes in a circle, scripts
on chairs, the room with the lights up. It's the single biggest improvement left, because
right now the site tells parents kids have a good time rather than showing them.

Also: the social preview image. Add a 1200×630 PNG called `share-image.png` to `imgs`, and
links to your site will show it when shared in a Facebook group. Until then they show as a
bare URL.
