$(function(){ // Fonction principale qui s'exécute quand le document HTML est complètement chargé
    let $mainMenuItems = $("#main-menu ul").children("li"), // Sélectionne tous les éléments <li> qui sont enfants directs de #main-menu ul
    totalMainMenuItems = $mainMenuItems.length, // Stocke le nombre total d'éléments dans le menu pour les validations futures
    openedIndex = 2, // Définit l'index de l'élément qui sera ouvert par défaut (0-based, donc le 3ème élément)

    // Fonction d'initialisation qui configure le menu au chargement de la page
    init = function(){ 
       bindEvent(); // Attache tous les gestionnaires d'événements nécessaires
       if(validIndex(openedIndex)){ // Vérifie si l'index par défaut est dans les limites valides
             animateItem($mainMenuItems.eq(openedIndex), true, 700); // Anime l'élément par défaut pour l'ouvrir avec une durée de 700ms
       }
    };
    
    // Fonction qui configure tous les écouteurs d'événements pour les interactions utilisateur
    bindEvent = function(){ 
        $mainMenuItems.children(".images").click(function(){ // Attache un gestionnaire de clic sur les éléments avec classe .images
            let newIndex = $(this).parent().index(); // Récupère l'index de l'élément <li> parent dans la liste
            checkAndAnimateItem(newIndex) // Vérifie si l'élément peut être animé et effectue l'animation
        });
        
        $(".button").hover( 
        function(){ // Fonction exécutée quand le pointeur entre sur un bouton
            $(this).addClass("hovered") // Ajoute la classe CSS "hovered" pour les effets visuels au survol
        },
        function(){ // Fonction exécutée quand le pointeur quitte un bouton
            $(this).removeClass("hovered") // Retire la classe CSS "hovered" pour revenir à l'état normal
        },
        );
        
        $(".button").click(function(){ // Attache un gestionnaire de clic sur les éléments avec classe .button
            let newIndex = $(this).index(); // Récupère l'index du bouton cliqué
            checkAndAnimateItem(newIndex) // Vérifie si l'élément peut être animé et effectue l'animation
        });
    }

    // Fonction utilitaire qui vérifie si un index est dans les limites valides du menu
    validIndex = function(indexToCheck){ 
        return (indexToCheck >= 0) && (indexToCheck < totalMainMenuItems); // Retourne true si l'index est entre 0 et le nombre total d'éléments-1
    }

    // Fonction qui gère l'animation d'ouverture ou de fermeture d'un élément du menu
    animateItem = function($item, toOpen, speed){ 
        let $colorImage = $item.find(".color"); // Sélectionne l'image colorée à l'intérieur de l'élément
        itemParam = toOpen ? {width:"420px"} : {width:"140px"}, // Définit la largeur finale selon l'action (ouvrir=420px, fermer=140px)
        colorImageParam = toOpen ? {left : "0px"} : {left:"140px"}; // Définit la position gauche de l'image selon l'action
        $colorImage.animate(colorImageParam, speed); // Anime l'image colorée avec la vitesse spécifiée
        $item.animate(itemParam, speed); // Anime l'élément du menu avec la vitesse spécifiée
    };
    
    // Fonction qui gère la logique d'ouverture/fermeture des éléments du menu
    checkAndAnimateItem = function(indexToCheckAndAnimate){ 
        if(openedIndex === indexToCheckAndAnimate) // Si l'utilisateur clique sur l'élément déjà ouvert
        {
            animateItem($mainMenuItems.eq(indexToCheckAndAnimate), false, 250); // Ferme cet élément avec une animation de 250ms
            openedIndex = -1; // Réinitialise l'index à -1 pour indiquer qu'aucun élément n'est ouvert
        }
        else // Si l'utilisateur clique sur un élément différent
        {
            if(validIndex(indexToCheckAndAnimate)) // Vérifie d'abord si l'index est valide
            {
                animateItem($mainMenuItems.eq(openedIndex), false, 250); // Ferme l'élément actuellement ouvert (s'il y en a un)
                openedIndex = indexToCheckAndAnimate; // Met à jour la variable qui garde trace de l'élément ouvert
                animateItem($mainMenuItems.eq(openedIndex), true, 250); // Ouvre le nouvel élément avec une animation de 250ms
            }
        }
    };
    
    init(); // Lance l'initialisation du menu au chargement
});
