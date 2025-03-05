import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ProductTable } from './components/ProductTable'

import 'primeflex/primeflex.min.css'
import 'primeicons/primeicons.css'

import "primereact/resources/themes/lara-light-cyan/theme.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductTable />
  </StrictMode>,
)
