const EMAIL_PATTERN=/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Method not allowed'});}
  const name=String(req.body?.name||'').trim(),company=String(req.body?.company||'').trim(),email=String(req.body?.email||'').trim().toLowerCase(),phone=String(req.body?.phone||'').trim(),message=String(req.body?.message||'').trim(),website=String(req.body?.website||'').trim();
  if(website)return res.status(200).json({ok:true});
  if(!name||name.length>100)return res.status(400).json({error:'Bitte geben Sie Ihren Namen ein.'});
  if(!EMAIL_PATTERN.test(email)||email.length>254)return res.status(400).json({error:'Bitte geben Sie eine gültige E-Mail-Adresse ein.'});
  if(company.length>140||phone.length>60||message.length>3000)return res.status(400).json({error:'Eine Eingabe ist zu lang.'});
  const apiKey=process.env.RESEND_API_KEY;
  if(!apiKey){console.error('RESEND_API_KEY is not configured');return res.status(503).json({error:'Der Anfrageversand ist noch nicht vollständig eingerichtet.'});}
  const recipient='info@rm-workforce.de',from=process.env.RESEND_FROM||'RM Workforce <anfrage@rm-workforce.de>',subject='RM Workforce anfragen';
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const html=`<h2>RM Workforce anfragen</h2><p><strong>Name:</strong> ${esc(name)}</p><p><strong>Firma / Organisation:</strong> ${esc(company||'-')}</p><p><strong>E-Mail:</strong> ${esc(email)}</p><p><strong>Telefon:</strong> ${esc(phone||'-')}</p><p><strong>Projekt / Anforderungen:</strong><br>${esc(message||'-').replace(/\\n/g,'<br>')}</p><hr><p>Gesendet über die RM Workforce Geschäftskundenseite.</p>`;
  try{
    const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[recipient],reply_to:email,subject,html})});
    if(!response.ok){const detail=await response.text();console.error('Resend failed',response.status,detail);throw new Error('Mail provider error');}
    return res.status(200).json({ok:true});
  }catch(error){console.error('Workforce inquiry failed',error);return res.status(500).json({error:'Die Anfrage konnte vorübergehend nicht gesendet werden.'});}
}