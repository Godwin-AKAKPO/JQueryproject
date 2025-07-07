$(function(){ // Fonction qui s'exécute quand le DOM est prêt
    let $mainMenuItems = $("#main-menu ul").children("li"), // Sélectionne tous les éléments li enfants de #main-menu ul
    totalMainMenuItems = $mainMenuItems.length, // Compte le nombre total d'éléments dans le menu
    openedIndex = 2, // Index de l'élément qui sera ouvert par défaut (le troisième élément)

    init = function(){ // Fonction d'initialisation
       bindEvent(); // Appel de la fonction qui gère les événements
       if(validIndex(openedIndex)){ // Vérifie si l'index par défaut est valide
             animateItem($mainMenuItems.eq(openedIndex), true, 700); // Anime l'élément par défaut pour l'ouvrir
       }
    };
    bindEvent = function(){ // Fonction qui attache les gestionnaires d'événements
        $mainMenuItems.children(".images").click(function(){ // Attache un événement click aux images du menu
            let newIndex = $(this).parent().index(); // Récupère l'index de l'élément parent
            checkAndAnimateItem(newIndex) // Vérifie et anime l'élément correspondant
        });
        $(".button").hover( // Attache des événements hover aux boutons
        function(){ // Fonction exécutée quand la souris entre sur le bouton
            $(this).addClass("hovered") // Ajoute la classe "hovered"
        },
        function(){ // Fonction exécutée quand la souris quitte le bouton
            $(this).removeClass("hovered") // Retire la classe "hovered"
        },
        );
        $(".button").click(function(){ // Attache un événement click aux boutons
            let newIndex = $(this).index(); // Récupère l'index du bouton
           checkAndAnimateItem(newIndex) // Vérifie et anime l'élément correspondant
        });
    }

    validIndex = function(indexToCheck){ // Fonction qui vérifie si un index est valide
        return (indexToCheck >= 0) &&(indexToCheck < totalMainMenuItems); // Retourne vrai si l'index est entre 0 et le nombre total d'éléments
    }

    animateItem = function($item, toOpen, speed){ // Fonction qui anime un élément du menu
        let $colorImage = $item.find(".color"); // Récupère l'image colorée dans l'élément
        itemParam = toOpen ? {width:"420px"} : {width:"140px"}, // Définit la largeur selon si on ouvre ou ferme
        colorImageParam = toOpen ? {left : "0px"} : {left:"140px"}; // Définit la position gauche selon si on ouvre ou ferme
        $colorImage.animate(colorImageParam, speed); // Anime l'image colorée
        $item.animate(itemParam, speed); // Anime l'élément du menu
    };
    checkAndAnimateItem = function(indexToCheckAndAnimate){ // Fonction qui vérifie et anime un élément selon son index
        if(openedIndex === indexToCheckAndAnimate) // Si l'élément est déjà ouvert
        {
            animateItem($mainMenuItems.eq(indexToCheckAndAnimate), false, 250); // Ferme l'élément
            openedIndex = -1; // Réinitialise l'index ouvert à -1 (aucun élément ouvert)
        }
        else // Si l'élément n'est pas déjà ouvert
        {
            if(validIndex(indexToCheckAndAnimate)) // Vérifie si l'index est valide
            {
                animateItem($mainMenuItems.eq(openedIndex), false, 250); // Ferme l'élément actuellement ouvert
                openedIndex = indexToCheckAndAnimate; // Met à jour l'index ouvert
                animateItem($mainMenuItems.eq(openedIndex), true, 250); // Ouvre le nouvel élément
            }
        }
    };
    init(); // Appel de la fonction d'initialisation
});
