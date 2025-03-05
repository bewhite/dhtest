import { Button } from 'primereact/button'
import { TabView, TabPanel } from 'primereact/tabview';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { useEffect, useState } from 'react'
import { Product } from '../types/products'
import { getProducts } from '../api/products'
import { AddProductDialog } from './AddProductDialog'
import { blinq } from 'blinq'
import { Chart } from './Chart'

export const ProductTable = () => {
  const [products, setProducts] = useState([] as Product[])
  const [addProductDialogVisible, setAddProductDialogVisible] = useState(false)

  useEffect(() => {
    getProducts().then(data => setProducts(data))
  }, []);

  const includedColumns = [
    { fieldName: 'categoryName', displayName: 'Category' },
    { fieldName: 'name', displayName: 'Name' },
    { fieldName: 'productCode', displayName: 'Product Code' },
    { fieldName: 'price', displayName: 'Price' },
    { fieldName: 'sku', displayName: 'SKU' },
    { fieldName: 'stockQuantity', displayName: 'Stock Quantity' },
    { fieldName: 'dateAdded', displayName: 'Date Added' }
  ]

  const onClose = (model: Product) => {
    setAddProductDialogVisible(false)
    const productsPlus = blinq([...products, model])
      .orderBy(p => p.name)
      .toArray()

    setProducts(productsPlus)
  }

  const stockPerCategory = blinq(products)
    .groupBy(p => p.categoryName)
    .select(g => ({ categoryName: g.key, stockQuantity: g.aggregate(0, (a, p) => a + p.stockQuantity) }))
    .orderBy(p => p.categoryName)
    .toArray()

  const stockAddedPerPeriod = blinq(products)
    .groupBy(p => new Date(p.dateAdded).getFullYear())
    .select(g => ({ year: g.key, stockQuantity: g.aggregate(0, (a, p) => a + p.stockQuantity) }))
    .orderBy(p => p.year)
    .toArray()

  return (
    <TabView>
      <TabPanel header="Products">
        <DataTable value={products} size="small" first={0} paginator rows={10} resizableColumns>
          {includedColumns.map(c => (
            <Column key={c.fieldName} field={c.fieldName} header={c.displayName} body={(p: Product) => {
              return (p as any)[c.fieldName]
            }} align="center" />
          ))}
        </DataTable>
        <Button label="Product" size="small" icon="pi pi-plus" onClick={() => setAddProductDialogVisible(true)} />
        <AddProductDialog visible={addProductDialogVisible} onClose={onClose} onHide={() => setAddProductDialogVisible(false)} />
      </TabPanel>
      <TabPanel header="Stock Chart">
        <Chart option={{
          title: {
            text: 'Stock by Product Category'
          },
          tooltip: {},
          legend: {
            data: ['Stock']
          },
          xAxis: {
            data: stockPerCategory.map(p => p.categoryName)
          },
          yAxis: {},
          series: [{
            name: 'Product Categories',
            type: 'bar',
            data: stockPerCategory.map(p => p.stockQuantity)
          }]
        }} />
      </TabPanel>
      <TabPanel header="Stock Added Chart">
        <Chart option={{
          title: {
            text: 'Stock Added by Year'
          },
          tooltip: {},
          legend: {
            data: ['Stock']
          },
          xAxis: {
            data: stockAddedPerPeriod.map(p => p.year)
          },
          yAxis: {},
          series: [{
            name: 'Years',
            type: 'bar',
            data: stockAddedPerPeriod.map(p => p.stockQuantity)
          }]
        }} />
      </TabPanel>
    </TabView>
  )
}