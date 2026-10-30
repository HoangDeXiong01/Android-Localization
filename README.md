# Android Localization

**Translate Android apps from your phone. No computer required.**

Android Localization (an XLIFF and `strings.xml` editor) is a mobile-first localization editor for Android. It opens **XLIFF** (`.xlf` / `.xliff`) and Android **`strings.xml`** files, lets you translate them on a touchscreen, and saves the result back out, ready to share with the project owner. It is built for volunteer translators who only have a phone.

Everything runs on your device. There is no account, no server, and no upload step.

---

## Screenshots

<table>
  <tr>
    <td align="center"><img src="screenshots/xliff-editor.png" width="260" alt="Editing an XLIFF file"><br><sub>XLIFF editing</sub></td>
    <td align="center"><img src="screenshots/strings-xml-editor.png" width="260" alt="Editing a strings.xml file"><br><sub>strings.xml editing</sub></td>
    <td align="center"><img src="screenshots/settings.png" width="260" alt="Settings"><br><sub>Settings and QA checks</sub></td>
  </tr>
</table>

---

## Features

### Open and save the formats translators actually receive
- **XLIFF 1.2 and 2.x** (`<trans-unit>` / `<unit>`), including files exported from **Crowdin** (context and labels are shown on each card).
- **Android `strings.xml`**: `<string>`, `<string-array>` and `<plurals>`. Entries marked `translatable="false"` are dimmed.
- For `strings.xml`, pick a target language and save as `strings-<lang>.xml`. A list of common languages is built in, and you can add, edit and remove your own codes (e.g. `pt-BR`, `fil`, `sr-Latn`) in Settings.
- XLIFF edits are written back into the original text, so the rest of your file is left untouched. In XLIFF 1.2 the `state` of an edited target follows its text (for example `needs-translation` becomes `translated`).
- Save through the Android share sheet: send to Drive, email, a chat app, or a file manager.
- **Save as strings.xml (Android):** export any XLIFF 1.2 or 2.x file to `strings.xml`, with a report of anything skipped (empty, hidden, duplicate or invalid entries). Hidden units can be written as `translatable="false"` or left out (Settings).

### Built for small screens
- One card per string, with live character counts and an optional per-string max length (from `maxwidth`).
- **Placeholders, escapes, entities, tags and XLIFF 2 inline codes are highlighted** (`%s`, `%1$d`, `{name}`, `\n`, `&amp;`, `<b>`) so you do not break them by accident.
- **Edit on preview** (optional): see and type text as it is displayed (`&amp;amp;` shows as `&amp;`); it is escaped again automatically when saved (`&quot;` / `&apos;` in XLIFF, `\"` / `\'` in `strings.xml`).
- Paging (10 / 20 / 50 / 100 / all), previous/next, and **jump to a page** by typing its number. Large files stay smooth.
- Optional context panel per card, approve and hide toggles, and a one-tap **undo** for each string.
- Light and dark themes: follow the system or choose one.

### Find things fast
- Search by ID/key, resource name, source, context, label or target text.
- Optional **regular-expression** search.
- Sort by: edited first, QA issues first, clipboard first, unapproved, hidden, untranslated, same as source, longest/shortest source or target, and over max length.

### Machine translation
- **Free engine:** Google Translate with a MyMemory fallback.
- **AI engines (Gemini or Groq):** use your own API key, load the list of models your key can access, and send context along with each string: the key name, plural form, labels, max length, glossary terms, and your own notes (e.g. *"Music player app. Informal tone. Keep 'Playlist' untranslated."*).
- Placeholders and tags are protected during translation, and a warning appears if any went missing.
- Adjustable **rate limit** (requests per minute, per engine) with automatic retry on 429/503 errors.
- **Merge requests:** bulk translation can send several strings (2 to 30) in one request. It needs far fewer requests and finishes sooner, and any string whose answer comes back incomplete is translated again on its own.
- Translate one string in a preview dialog and apply it, or run it on many selected strings with progress and a stop button.

### Similar translations
From the translate dialog of any string, find other strings that look like it, either by **source** or by **target**. Choose the algorithm (Levenshtein by characters or words, Dice bigrams, Jaccard by words), the minimum match, and browse the matches page by page. Apply the translation to the matches you want, or open them to review first.

### Clipboard (per-string backups)
Save up to **3 versions** of a string's translation before you try something else (machine translation, copying the source, a bulk action) and bring any of them back later. Strings that have saved versions can be sorted to the top. Clipboards are kept for the session and restored with it.

### Bulk actions
Select any number of strings (or all strings shown), then: machine translate, approve / unapprove, hide / unhide (`translate="no"` in XLIFF, `translatable="false"` in `strings.xml`), copy source to target, undo changes, save to clipboard, or clear their clipboards.

Hiding works on the whole element: plurals, string arrays and multi-segment units are hidden together. You are told which other items will change and can review them first; they are marked with a dashed border until you finish.

### Quality assurance
Each card shows warnings for:
- Missing or extra placeholders and tags
- XLIFF 2 inline codes
- Leading/trailing spaces and line-break differences
- Double spaces
- End-punctuation mismatches
- Number mismatches
- Invalid XML
- Glossary terms not used
- Unescaped quotes and apostrophes (`strings.xml`)
- XLIFF 2 validation rules
- Text over the maximum length
- Optionally, the same checks on hidden units

Every check can be turned on or off in Settings, and a counter in the header shows how many strings have issues.

### Glossary
Import a **CSV, TSV or TBX** glossary. For delimited files you choose the delimiter, whether the first row is a header, and the source and target columns, with a preview. Terms are used by the QA check and passed to machine translation so key terms stay consistent.

### Import existing translations
Merge translations from another XLIFF or `strings.xml` file. A preview shows what is **new**, what would be **overwritten** and what is unchanged, so you can fill empty strings only or apply everything.

### Never lose your work
Edits, approvals and clipboards are kept on your device while you work. If the app is closed or killed, it offers to **restore the previous session** the next time you open it, or to discard it.

### Helpful XML error report
If a file fails to open because of broken XML, the app locates the problem lines (unescaped `&` or `<`, unclosed tags, bad attributes, invalid characters and more) and lets you save them to a `.txt` file to send back to the developer. It never modifies your file silently.

---

## Typical workflow

1. Tap the **menu** icon at the top right, choose **Open file**, and pick the `.xlf` or `strings.xml` file you were given.
2. For `strings.xml`, choose the target language in the top bar.
3. Translate by typing, copying the source, or using machine translation. Fix anything flagged by the QA warnings.
4. Open the menu again and choose **Save** (or **Save as strings.xml (Android)** for an XLIFF), then share the file back.

---

## Privacy

- Your files are processed **locally** on your device.
- Settings, your glossary, your session and your Gemini / Groq API key are stored **only on your device**.
- Text is sent over the network **only** when you use machine translation: to Google Translate / MyMemory (free engine), or to the AI service you picked with your own key (Google's Gemini API or Groq). Each key is sent only to its own service.

---

## Contributing

Issues and pull requests are welcome, especially bug reports with a sample file that fails to open or save correctly. Please remove any private strings from files before attaching them.
