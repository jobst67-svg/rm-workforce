document.querySelectorAll('.rmw-header').forEach(header=>{
  const button=header.querySelector('.rmw-menu-toggle');
  const nav=header.querySelector('.rmw-nav');
  if(!button||!nav)return;
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
