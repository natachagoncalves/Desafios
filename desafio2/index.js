// 1. Orderna todos os objetos pela chave "name"
const listName = document.querySelector(".list_name");
const namesList = [];

fetch("./lista.json")
  .then((response) => {
    return response.json();
  }).then((jsonBody) => {  
    jsonBody.forEach((items) => {
      let names = items.name;
      namesList.push(names);
    })
    console.log(namesList);
    listName.innerHTML = namesList;
  })


// 2. Gerar a patir do resultado do item 1, uma nova array com as chaves "name","email","price" e "address"
const cadastroNomes = document.querySelector(".cadastro_nomes");
const nomesCadastro = [];

fetch("./lista.json")
  .then((response) => {
    return response.json();
  })
  .then((jsonBody) => {
    jsonBody.forEach((items) => {
      let listaDados = [
        items.name,
        items.email,
        items.price,
        items.address.street,
        items.address.suite,
        items.address.city,
        items.address.zipcode,
      ];
      console.log(listaDados)
      nomesCadastro.push(listaDados);
      cadastroNomes.innerHTML = nomesCadastro;
    }) 
  })

// 3. Filtrar a partir do resultado do item 2, os dados por usuários da "rua" com o valor "Kulas Light"
const cadastroNomesStreet = document.querySelector(".cadastro_nomesStreet");
const listaNomesStreet = [];

fetch("./lista.json")
  .then((response) => {
    return response.json();
  })
  .then((jsonBody) => {
    jsonBody.forEach((items) => {
      let cadastro = [
        items.name,
        items.email,
        items.price,
        items.address.street,
      ]
      
      let cadastroRua = cadastro.filter((kulasStreet) => {
        return (kulasStreet = items.address.street === "Kulas Light")
      })

      console.log(cadastroRua)
      listaNomesStreet.push(cadastroRua);
      cadastroNomesStreet.innerHTML = listaNomesStreet;
    }) 
  })

// 4. Somar a partir do resultado do item 3, todos os valores da chave "price" e retonar um valor total

const newArray = [];
const cadastroKulaStreetPrices = [];
const sunCadastroKulaStreetPrices = document.querySelector( ".sunCadastroKulaStreetPrices");
const prices = [];


fetch("./lista.json")
  .then((response) => response.json())
  .then((response) => {
    response.forEach((items) => {
      let cadastro = [
        items.name,
        items.email,
        items.price,
        items.address.street,
      ];
      let cadastroKulaStreet = cadastro.filter((kulasStreet) => {
        return (kulasStreet = items.address.street === "Kulas Light");
      });
      // console.log(cadastroKulaStreet[3]);
      newArray.push(cadastroKulaStreet[2]);
    });

    // console.log(newArray);
    // console.log(newArray[0], newArray[3], newArray[5]);

    cadastroKulaStreetPrices.push(newArray[0], newArray[3], newArray[5]);
    // console.log(cadastroKulaStreetPrices);

    let sunPrice = cadastroKulaStreetPrices.reduce((total, n) => {
      return (total += n);
    }, 0);

    let sunPriceTofixed = Number(sunPrice.toFixed(2));

    prices.push(sunPriceTofixed);

    console.log(prices);

    sunCadastroKulaStreetPrices.innerHTML = `U$: ${prices}`;
  });

