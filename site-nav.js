document.querySelectorAll('.rmw-header').forEach(header=>{
  const button=header.querySelector('.rmw-menu-toggle');
  const nav=header.querySelector('.rmw-nav');
  if(!nav)return;

  // FAQ zentral in die gemeinsame Navigation einsetzen.
  if(!nav.querySelector('a[href="/faq.html"],a[href="faq.html"]')){
    const faq=document.createElement('a');
    faq.href='/faq.html';
    faq.textContent='FAQ';
    if(location.pathname==='/faq.html') faq.classList.add('active');
    const about=nav.querySelector('a[href="/ueber-uns.html"],a[href="ueber-uns.html"]');
    if(about) nav.insertBefore(faq,about);
    else{
      const request=nav.querySelector('.rmw-request');
      if(request) nav.insertBefore(faq,request);
      else nav.appendChild(faq);
    }
  }

  if(!button)return;
  const close=()=>{nav.classList.remove('is-open');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Menü öffnen');button.textContent='☰'};
  button.addEventListener('click',()=>{
    const open=nav.classList.toggle('is-open');
    button.setAttribute('aria-expanded',String(open));
    button.setAttribute('aria-label',open?'Menü schließen':'Menü öffnen');
    button.textContent=open?'✕':'☰';
  });
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')close()});
  document.addEventListener('click',event=>{if(!header.contains(event.target))close()});
});
