import { INavData } from '@coreui/angular';

export const navItemsAdmin: INavData[] = [
  {
    name: 'Accueil',
    url: '/admin/accueil',
    icon: 'icon-home',
   
  },
  {
    title: true,
    name: 'Fonctionnalités'
  },
  {
    name: 'gerer Banquier',
    url: '/admin/banquier',
    icon: 'icon-wrench',
    children: [
      {
        name: 'Ajouter',
        url: '/admin/banquier/ajouter',
        icon: 'icon-plus'
      },
      {
        name: 'Modifier',
        url: '/admin/banquier/modifier',
        icon: 'icon-pencil'
      },
      {
        name: 'Supprimer',
        url: '/admin/banquier/supprimer',
        icon: 'icon-trash'
      }
    ]
  }
];



export const navItemsClient: INavData[] = [
  {
    name: 'Accueil',
    url: '/client/accueil',
    icon: 'icon-home',
   
  },
  {
    title: true,
    name: 'Fonctionnalités'
  },
  {
    name: 'Opération Bancaire',
    url: '/client/OpBancaire',
    icon: 'icon-wallet',
    children: [
      {
        name: 'crediter un compte a partir d\'un autre',
        url: '/client/OpBancaire/crediter',
        icon: 'icon-plus'
      },
      {
        name: 'Historique des comptes client',
        url: '/client/OpBancaire/historique',
        icon: 'icon-notebook'
      }
    ]
  },
  {
    title: true,
    name: 'Profile'
  },
  {
    name: 'gérer votre compte',
    url: '/client/coordonnées',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Information Génerale',
        url: '/client/coordonnées/personnel',
        icon: 'icon-pencil'
      },
      {
        name: 'Mot de passe',
        url: '/client/coordonnées/authentification',
        icon: 'icon-pencil'
      }
    ]
  }


  
];



export const navItemsChef: INavData[] = [
  {
    name: 'Accueil',
    url: '/chefAgence/accueil',
    icon: 'icon-home',
   
  },
  {
    title: true,
    name: 'Fonctionnalités'
  },
  {
    name: 'Consulter les informations des clients',
    url: '/chefAgence/InfoClient',
    icon: 'icon-docs',
  },
  {
    name: 'Les caissier d\'agence',
    url: '/chefAgence/CaissierAgence',
    icon: 'icon-people',
  },
  {
    title: true,
    name: 'Profile'
  },
  {
    name: 'gérer votre compte',
    url: '/chefAgence/coordonnées',
    icon: 'icon-wrench',
    children: [
      {
        name: 'Information Génerale',
        url: '/chefAgence/coordonnées/personnel',
        icon: 'icon-pencil'
      },
      {
        name: 'Authentification',
        url: '/chefAgence/coordonnées/authentification',
        icon: 'icon-pencil'
      }
    ]
  }


  
];
export const navItemsCaissier: INavData[] = [
  {
    name: 'Accueil',
    url: '/caissier/accueil',
    icon: 'icon-home',
   
  },
  {
    title: true,
    name: 'Fonctionnalités'
  },
  {
    name: 'Consulter les informations des clients',
    url: '/caissier/InfoClient',
    icon: 'icon-docs',
  },
  {
    name: 'gerer Client',
    url: '/caissier/client',
    icon: 'icon-wrench',
    children: [
      {
        name: 'Ajouter',
        url: '/caissier/client/ajouter',
        icon: 'icon-plus'
      },
      {
        name: 'Modifier',
        url: '/caissier/client/modifier',
        icon: 'icon-pencil'
      },
      {
        name: 'Supprimer',
        url: '/caissier/client/supprimer',
        icon: 'icon-trash'
      }
    ]
  },
  {
    name: 'gerer Compte',
    url: '/caissier/compte',
    icon: 'icon-wrench',
    children: [
      {
        name: 'Ajouter',
        url: '/caissier/compte/ajouter',
        icon: 'icon-plus'
      },
      {
        name: 'Supprimer',
        url: '/caissier/compte/supprimer',
        icon: 'icon-trash'
      }
    ]
  },
  {
    name: 'Opération Bancaire',
    url: '/caissier/OpBancaire',
    icon: 'icon-wallet',
    children: [
      {
        name: 'Debiter',
        url: '/caissier/OpBancaire/debiter',
        icon: 'icon-close'
      },
      {
        name: 'Crediter',
        url: '/caissier/OpBancaire/crediter',
        icon: 'icon-plus'
      },
      {
        name: 'Historique des comptes client',
        url: '/caissier/OpBancaire/historique',
        icon: 'icon-notebook'
      }
    ]
  },
  {
    title: true,
    name: 'Profile'
  },
  {
    name: 'gérer votre compte',
    url: '/caissier/coordonnées',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Information Génerale',
        url: '/caissier/coordonnées/personnel',
        icon: 'icon-pencil'
      },
      {
        name: 'Authentification',
        url: '/caissier/coordonnées/authentification',
        icon: 'icon-pencil'
      }
    ]
  }
];