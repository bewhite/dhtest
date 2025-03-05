import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Message } from 'primereact/message'
import { FloatLabel } from 'primereact/floatlabel'
import { Toolbar } from 'primereact/toolbar'
import { Controller, useForm } from "react-hook-form";
import { classNames } from "primereact/utils";
import { Fragment } from "react/jsx-runtime";
import { Product } from "../types/products";
import { postProduct } from '../api/products'

export interface AddProductDialogProps {
  visible: boolean,
  onClose: (model: Product) => void
  onHide: () => void
}

export const AddProductDialog = ({ ...props }: AddProductDialogProps) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<Required<Product>>();

  const clearState = () => {
    reset({
      categoryName: '',
      name: '',
      productCode: '',
      price: 0,
      sku: '',
      stockQuantity: 0,
      dateAdded: new Date().toISOString()
    })
  }

  const onShow = () => {
    clearState();
  }

  const onHide = () => {
    props.onHide()
    clearState()
  }

  const onSave = async (model: Product) => {
    await postProduct(model)
    props.onClose(model)
  }

  const footer = (
    <Toolbar start={(
      <Button label="Cancel" onClick={onHide} />
    )} end={(
      <Button label="Save" onClick={handleSubmit(onSave)} />
    )} />
  )

  return (
    <Dialog header="Add a Product" visible={props.visible} onShow={onShow} onHide={onHide} footer={footer}
      pt={{ content: { className: "pt-4" } }}>
      <div className="m-4">
        <Controller name="categoryName" control={control} rules={{ required: 'Category is required.' }} render={({ field, fieldState }) => (
          <Fragment>
            <FloatLabel>
              <InputText id="cat-name-value" {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
              <label htmlFor="cat-name-value" className={classNames({ 'p-invalid': errors.categoryName })}>Category</label>
            </FloatLabel>
            {errors.categoryName && <Message className="my-2" severity="error" text={errors.categoryName?.message} />}
          </Fragment>
        )} />
      </div>
      <div className="m-4">
        <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
          <Fragment>
            <FloatLabel>
              <InputText id="name-value" {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
              <label htmlFor="name-value" className={classNames({ 'p-invalid': errors.name })}>Name</label>
            </FloatLabel>
            {errors.name && <Message className="my-2" severity="error" text={errors.name?.message} />}
          </Fragment>
        )} />
      </div>
      <div className="m-4">
        <Controller name="productCode" control={control} rules={{ required: 'Product Code is required.' }} render={({ field, fieldState }) => (
          <Fragment>
            <FloatLabel>
              <InputText id="prod-code-value" {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
              <label htmlFor="prod-code-value" className={classNames({ 'p-invalid': errors.productCode })}>Product Code</label>
            </FloatLabel>
            {errors.productCode && <Message className="my-2" severity="error" text={errors.productCode?.message} />}
          </Fragment>
        )} />
      </div>
      <div className="m-4">
        <Controller name="price" control={control} rules={{ required: 'Price is required.' }} render={({ field, fieldState }) => (
          <Fragment>
            <FloatLabel>
              <InputText id="tab-title-value" keyfilter="money" {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
              <label htmlFor="tab-title-value" className={classNames({ 'p-invalid': errors.price })}>Price</label>
            </FloatLabel>
            {errors.price && <Message className="my-2" severity="error" text={errors.price?.message} />}
          </Fragment>
        )} />
      </div>
      <div className="m-4">
        <Controller name="sku" control={control} rules={{ required: 'SKU is required.' }} render={({ field, fieldState }) => (
          <Fragment>
            <FloatLabel>
              <InputText id="tab-title-value" {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
              <label htmlFor="tab-title-value" className={classNames({ 'p-invalid': errors.sku })}>SKU</label>
            </FloatLabel>
            {errors.sku && <Message className="my-2" severity="error" text={errors.sku?.message} />}
          </Fragment>
        )} />
      </div>
      <div className="m-4">
        <Controller name="stockQuantity" control={control} rules={{ required: 'Quantity is required.' }} render={({ field, fieldState }) => (
          <Fragment>
            <FloatLabel>
              <InputText id="tab-title-value" keyfilter="int" {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
              <label htmlFor="tab-title-value" className={classNames({ 'p-invalid': errors.stockQuantity })}>Stock Quantity</label>
            </FloatLabel>
            {errors.sku && <Message className="my-2" severity="error" text={errors.stockQuantity?.message} />}
          </Fragment>
        )} />
      </div>
    </Dialog>
  )
}