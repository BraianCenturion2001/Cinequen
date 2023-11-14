import React, { useCallback, useState } from 'react'
import { Form, Button, TextArea, Image, Dropdown } from "semantic-ui-react"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone"
import { useProductoCanje } from "../../../../hooks"

export function AddEditProductoForm(props) {
    const { onClose, onRefetch, producto } = props;
    const { addProductoCanje, updateProductoCanje } = useProductoCanje();
    const [previewImage, setPreviewImage] = useState(producto?.imagen || null)

    const onDrop = useCallback(async (acceptedFile) => {
        const file = acceptedFile[0];
        await formik.setFieldValue('imagen', file)
        setPreviewImage(URL.createObjectURL(file));
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop // La funcion se llama igual a la propiedad, por eso solo se pone onDrop y no onDrop: onDrop()
    });

    const tipoProductoCanjeOptions = [
        { key: '1', value: 'Entradas', text: 'Entradas' },
        { key: '2', value: 'Merchandising', text: 'Merchandising' },
    ];

    const formik = useFormik({
        initialValues: initialValues(producto),
        validationSchema: Yup.object(producto ? updateSchema() : newSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (producto) await updateProductoCanje(producto.id, formValue);
                else await addProductoCanje(formValue);
                onRefetch();
                onClose();
            } catch (error) {
                console.error(error)
            }
        }
    })

    return (
        <Form className='add-edit-pelicula-form' onSubmit={formik.handleSubmit}>
            <Form.Input name="nombre" value={formik.values.nombre} onChange={formik.handleChange} error={formik.errors.nombre} placeholder="Nombre del Producto"></Form.Input>
            <Form.Input name="precio_puntos" value={formik.values.precio_puntos} onChange={formik.handleChange} error={formik.errors.precio_puntos} placeholder="Precio en Puntos"></Form.Input>
            <Form.Input name="stock" value={formik.values.stock} onChange={formik.handleChange} error={formik.errors.stock} placeholder="Stock"></Form.Input>

            <Dropdown
                style={{ marginBottom: '15px' }}
                placeholder='Tipo de Producto'
                fluid selection search
                options={tipoProductoCanjeOptions}
                value={formik.values.tipo}
                error={formik.errors.tipo}
                onChange={(_, data) => formik.setFieldValue('tipo', data.value)} />

            <TextArea rows={3} placeholder='Descripción' name='descripcion' value={formik.values.descripcion} onChange={formik.handleChange} error={formik.errors.descripcion} />

            <Button type='button' fluid {...getRootProps()} color={formik.errors.imagen && "red"}>
                {previewImage ? "Editar Póster" : "Subir Póster"}
            </Button>

            <input {...getInputProps()} />

            <Image src={previewImage} />

            <Button type='submit' content={producto ? "Actualizar" : "Registrar"} color={producto ? "yellow" : "green"} fluid />
        </Form>
    )
}


function initialValues(data) {
    return {
        nombre: data?.nombre || "",
        tipo: data?.tipo || "",
        descripcion: data?.descripcion || "",
        precio_puntos: data?.precio_puntos || "",
        stock: data?.stock || 0,
        imagen: "",
    }
}

function newSchema() {
    return {
        nombre: Yup.string().required(true),
        tipo: Yup.string().required(true),
        descripcion: Yup.string().required(true),
        precio_puntos: Yup.string().required(true),
        stock: Yup.string().required(true),
        imagen: Yup.string().required(true),
    }
}

function updateSchema() {
    return {
        nombre: Yup.string().required(true),
        tipo: Yup.string().required(true),
        descripcion: Yup.string().required(true),
        precio_puntos: Yup.string().required(true),
        stock: Yup.string().required(true),
        imagen: Yup.string(),
    }
}