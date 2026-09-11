// src/utils/cleanShortcodes.js
export function cleanWordPressContent(htmlContent) {
  if (!htmlContent) return '';
  
  let cleaned = htmlContent;

  // 1. Remove contact or form shortcodes entirely
  cleaned = cleaned.replace(/\[contact[^\]]*\]/gi, '');
  cleaned = cleaned.replace(/\[\/contact[^\]]*\]/gi, '');

  // 2. Transform gallery shortcodes into clean placeholder text
  cleaned = cleaned.replace(
    /\[gallery[^\]]*\]/gi, 
    '<div style="padding: 16px; margin: 16px 0; background: #f5f5f5; border-radius: 4px; text-align: center; color: #666;"><em>[Gallery items available in the main Gallery view]</em></div>'
  );

  // 3. Strip any other generic lingering WordPress shortcodes
  cleaned = cleaned.replace(/\[\/?\w+([^\]]+)?\]/g, '');

  // 4. Neutralize or redirect external links to unowned domains (like old external gallery links)
  cleaned = cleaned.replace(
    /href="https?:\/\/(?!9digitdesigns\.com|localhost)[^"]+"/gi, 
    'href="#unavailable" onclick="return false;" style="color: inherit; text-decoration: none; cursor: default;"'
  );

  return cleaned;
}