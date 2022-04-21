import React, {useState, useEffect} from 'react';
import './App.css';
import productsData from './productsData';

function App() {
  
  const [categoriesArr, setCategoriesArr ] = useState(productsData.categories);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  
  const [subCategoriesArr, setSubCategoriesArr] = useState(productsData.categories[0].subCategories);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [selectedSubCategoryIndex, setSelectedSubCategoryIndex] = useState(0);
  
  const [productsArr, setProductsArr] = useState(productsData.categories[0].subCategories[0].products);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [selectedSalesData, setSelectedSalesData] = useState([]);

  const handleCatChange = (e) => {
    let index = e.target.value
    setSelectedCategoryIndex(index);  
  }
 
  const handleSubCatChange = (e) => {
    let index = e.target.value;
    setSelectedSubCategoryIndex(index);
    setSelectedSubCategory(subCategoriesArr[index].subCategory)
  }

  const handleProductChange = (e) => {
    let index = e.target.value
    setSelectedProductIndex(index);
    setSelectedSalesData(productsArr[index].sales);
  }

  useEffect(() => {
    setCategoriesArr(productsData.categories);
    setSubCategoriesArr(productsData.categories[selectedCategoryIndex].subCategories);
  }, [])

  useEffect(() => {
    setSubCategoriesArr(productsData.categories[selectedCategoryIndex].subCategories);
    setSelectedSubCategory(productsData.categories[selectedCategoryIndex].subCategories[0].subCategory);
  }, [selectedCategoryIndex]);

  useEffect(() => {
    setProductsArr(subCategoriesArr[selectedSubCategoryIndex].products)
    setSelectedSalesData(productsArr[selectedProductIndex].sales)
  }, [selectedSubCategory])



  return (
    <div className="App">
      <div className="selectors-wrapper container">
        <div className="select-label">Categoria: 
          <select name="categories" id="categories" onChange={handleCatChange}>
            {
              categoriesArr.map((element, idx) => {
                return(
                  <option key={`${element.category}${idx}`} value={idx}>{element.category}</option>
                )
              })
            }
          </select>
        </div>
        <div className="select-label">Item: 
          <select name="subCategories" id="subCategories" onChange={handleSubCatChange}>
            {
              subCategoriesArr.map((subCategoryObj, idx) => {
                return(
                  <option key={`${subCategoryObj.subCategory}${idx}`} value={idx}>{subCategoryObj.subCategory}</option>
                )
              })
            }
          </select>
        </div>
        <div className="select-label">Marca:
          <select name="products" id="products" onChange={handleProductChange}>
            {
              productsArr.map((productObj, idx) => {
                return(
                  <option key={`${productObj.product}${idx}`} value={idx}>{productObj.product}</option>
                )
              })
            }
          </select>
        </div>      
      </div>
      <pre>
      {JSON.stringify(selectedSalesData, null, 2)}
      </pre>
    </div>
  );
}

export default App;
