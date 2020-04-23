const aux = (props) => props.children; 
// props.children permet simplement de déléguer les objets enfants dans sa sortie (le contenue du 'Aux')
// grace à ça on peut utiliser un render() avec 2 éléments (par exemple 2 <h> à la racine) sans les mettres dans un <div>

export default aux;