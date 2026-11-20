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

It sends for real. The visitor types, presses Send, and it lands in your inbox — they never
leave the page and they don't need an email app.

It works in two pieces:

1. **`index.html`** — the boxes on the page.
2. **`functions/api/contact.js`** — a small file Cloudflare runs on its own servers. It turns
   the message into an email and sends it. You never edit this file.

For that to work you need a free **Resend** account, because Cloudflare can't send email by
itself. It takes about ten minutes, once.

### Setting it up

1. Go to **resend.com** and sign up using **eashlie07@gmail.com** — the same address the
   messages go to. (Free tier: 3,000 emails a month, 100 a day. You will not come close.)
2. In Resend, click **API Keys → Create API Key**. Name it "Brave Voices", permission
   "Sending access". Copy the key — it starts with `re_` and you only see it once.
3. Go to your Cloudflare dashboard → **Workers & Pages** → your Brave Voices project →
   **Settings** → **Environment variables** (or "Variables and Secrets").
4. Add these three. Set each as a **Secret** where the option is offered:

   | Name | Value |
   |---|---|
   | `RESEND_API_KEY` | the `re_...` key from step 2 |
   | `TO_ADDRESS` | `eashlie07@gmail.com` |
   | `FROM_ADDRESS` | `Brave Voices Academy <onboarding@resend.dev>` |

5. Save, then redeploy (upload the files again, or **Retry deployment**).
6. Send yourself a test message from the live site.

### Why `onboarding@resend.dev` and not your own address

Resend only lets you send *from* an address on a domain you've verified. You don't own a
domain yet, so the sending address is theirs — but the **reply-to** is the parent's, so when
you hit Reply you're answering the parent directly. Nobody sees the onboarding address
unless they dig into the message headers.

**The day you buy `bravevoices.com`:** verify it in Resend (adds a few DNS records, Resend
walks you through it), then change `FROM_ADDRESS` to
`Brave Voices Academy <hello@bravevoices.com>`. That also fixes the deliverability risk
below.

### The one real risk

Until you have your own domain, some of your mail may land in **spam** — Gmail treats
`onboarding@resend.dev` as an unknown sender. Check your spam folder for the first few
messages. It's another good reason to buy the domain.

### If it ever stops working

The form falls back on its own: the visitor sees a message telling them to email you
directly, with a clickable link. Nobody gets a dead button.

### Prefer a company that does this for you?

**Formspree** (formspree.io) needs no function file and no Cloudflare setup — free tier, 50
messages a month. Create a form, copy the endpoint they give you, and change one line in
`index.html`:

```html
<form id="contact-form" action="https://formspree.io/f/YOURCODE" method="POST">
```

Then delete the `functions` folder and the `<script>` at the bottom. Less control, less setup.
Fifty messages a month is a real ceiling once a class fills, so I'd start with Resend.

### Changing your email address

It appears in three places: the visible contact details near the top of the section, the
confirmation line under the button, and `TO_ADDRESS` in Cloudflare. Change all three.

## Publishing

You're on Cloudflare Pages. Upload **everything in this folder** — `index.html`,
`style.css`, the `imgs` folder, and the `functions` folder (that's the contact form's engine).
Keep the folder structure exactly as it is; `functions/api/contact.js` has to stay at that
path or the form won't find it. The site updates itself in about a minute. Then **look at it on your phone** before you tell
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
