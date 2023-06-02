function showSection() {
    document.getElementById('secciones').style.display = 'block';
    document.getElementById('conjuntos').style.display = 'none';
    document.getElementById('items').style.display = 'none';
    document.getElementById('nav-secciones').classList.remove('inactive')
    document.getElementById('nav-secciones').classList.add('active')
    document.getElementById('nav-conjuntos').classList.remove('active')
    document.getElementById('nav-conjuntos').classList.add('inactive')
    document.getElementById('nav-items').classList.remove('active')
    document.getElementById('nav-items').classList.add('inactive')


  }
  
  function showConjuntos() {
    document.getElementById('secciones').style.display = 'none';
    document.getElementById('conjuntos').style.display = 'block';
    document.getElementById('items').style.display = 'none';
    document.getElementById('nav-secciones').classList.remove('active')
    document.getElementById('nav-secciones').classList.add('inactive')
    document.getElementById('nav-conjuntos').classList.remove('inactive')
    document.getElementById('nav-conjuntos').classList.add('active')
    document.getElementById('nav-items').classList.remove('active')
    document.getElementById('nav-items').classList.add('inactive')

  }
  
  function showItems() {
    document.getElementById('secciones').style.display = 'none';
    document.getElementById('conjuntos').style.display = 'none';
    document.getElementById('items').style.display = 'block';
    document.getElementById('nav-secciones').classList.remove('active')
    document.getElementById('nav-secciones').classList.add('inactive')
    document.getElementById('nav-conjuntos').classList.remove('active')
    document.getElementById('nav-conjuntos').classList.add('inactive')
    document.getElementById('nav-items').classList.remove('inactive')
    document.getElementById('nav-items').classList.add('active')
    
  }
  