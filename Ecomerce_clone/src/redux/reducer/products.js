export const products = [
    {
        id:0,
        title:'something',
        price:400,
        img:'https://bit.ly/2ZXLttz'
    },
    {
        id:1,
        title:'new shoes',
        price:600,
        img:'https://bit.ly/2ZXLttz'
    },
    {
        id:2,
        title:'casual shoe',
        price:300,
        img:'https://bit.ly/2ZXLttz'
    },
    {
        id:3,
        title:'Leather shoe',
        price:800,
        img:'https://bit.ly/2ZXLttz'
    },
    {
        id:4,
        title:'Running shoe',
        price:700,
        img:'https://bit.ly/2ZXLttz'
    },
    {
        id:5,
        title:'Slippers',
        price:200,
        img:'https://bit.ly/2ZXLttz'
    },
    {
        id:6,
        title:'Cowboy',
        price:600,
        img:'https://bit.ly/2ZXLttz'
    },
    {
        id:7,
        title:'Sandals',
        price:500,
        img:'https://bit.ly/2ZXLttz'
    },
]

console.log(products.filter((p)=>{
    return p.id!==7 && p.title!=='Sandals'
}))
