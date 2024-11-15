function affiche(){
    document.getElementById("accueil").classList.add('hidden');
    setTimeout(() => {
        document.getElementById("arbre").classList.add('visible');
        const div2Width = document.getElementById("arbre").offsetWidth;
        const centerPosition = (div2Width - window.innerWidth) / 2;
        window.scrollTo(centerPosition, 0);
      }, 1000);
}


window.addEventListener('wheel', function(event) {
    if (event.deltaY !== 0) {
      event.preventDefault();
      const scrollSpeed = 2; 
        window.scrollBy({
        left: event.deltaY * scrollSpeed,
        behavior: 'smooth'
      });
    }
  }, { passive: false });


  function masqueX(element){
    let warning= element.parentNode.style.display="none"; 
    document.getElementById("filter").style.display="none"; 
  }

  function closedetails(){
    if (window.innerWidth < 600) {
      document.getElementById("navbar").style.display = "none";
    }
    setTimeout(() => {
      document.getElementById("arbre").classList.add('visible');
      const div2Width = document.getElementById("arbre").offsetWidth;
      const centerPosition = (div2Width - window.innerWidth) / 2 ;
      window.scrollTo(centerPosition, 0);
    }, 1);
    document.getElementById("arbre-details").style.display="none";
    document.getElementById("filter").style.display="none";
    document.getElementById("arbre").style.display="flex";
    document.body.style.overflow = "visible";  // Désactive le défilement
    document.documentElement.style.overflow = "visible";
  }

  function arbre(element) {
    // Afficher les conteneurs
    document.getElementById("arbre-details").style.display = "flex";
    document.getElementById("filter").style.display = "flex";
    document.getElementById("navbar").style.display = "flex";
    document.body.style.overflow = "hidden";  // Désactive le défilement
    document.documentElement.style.overflow = "hidden";
    // Réinitialiser l'arbre secondaire
    let treeSecondaire = document.getElementById("treeSecondaire");
    treeSecondaire.innerHTML = "";

    // Créer la racine de l'arbre secondaire
    let ulRoot = document.createElement('ul');

    // Parcourir les parents de l'élément et les stocker dans un tableau
    let currentElement = element;
    let parents = [];
    console.log(`Commence avec : ${currentElement.textContent}`);

    while (currentElement && currentElement.textContent !== "KHEI") {
        console.log(`Ajoute : ${currentElement.textContent}`);
        
        // Créer un noeud pour chaque parent et les stocker
        let liPerson = document.createElement('li');
        let aPerson = document.createElement('a');
        aPerson.textContent = currentElement.textContent;
        aPerson.className = currentElement.className;
        liPerson.appendChild(aPerson);

        // Ajouter le noeud dans le tableau des parents
        parents.push(liPerson);

        // Aller au parent (2 niveaux plus haut dans la hiérarchie)
        currentElement = currentElement.closest('ul').parentNode.closest('li')?.querySelector('a');
    }

    // Ajouter les parents dans l'arbre secondaire, de bas en haut
    let currentUl = ulRoot;
    for (let i = parents.length - 1; i >= 0; i--) {
        let liPerson = parents[i];
        
        // Créer un nouvel <ul> pour les descendants de chaque parent
        let nextUl = document.createElement('ul');
        liPerson.appendChild(nextUl);

        // Ajouter le noeud <li> au parent actuel
        currentUl.appendChild(liPerson);

        // Déplacer la référence du parent actuel à ce nouvel <ul>
        currentUl = nextUl;
    }

    // Ajouter l'arbre secondaire dans le DOM
    if (ulRoot.childNodes.length > 0) {
        treeSecondaire.appendChild(ulRoot);
    }
}



