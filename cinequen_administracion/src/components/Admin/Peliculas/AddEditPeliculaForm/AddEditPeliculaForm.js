import React, { useCallback, useState } from 'react'
import { Form, Button, Select, TextArea, Image } from "semantic-ui-react"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone"
import { usePelicula } from "../../../../hooks"

export function AddEditPeliculaForm(props) {

    const { onClose, onRefetch, pelicula } = props;
    const { addPelicula, updatePelicula } = usePelicula();
    const [previewImage, setPreviewImage] = useState(pelicula?.poster || null)

    const onDrop = useCallback(async (acceptedFile) => {
        const file = acceptedFile[0];
        await formik.setFieldValue('poster', file)
        setPreviewImage(URL.createObjectURL(file));
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop // La funcion se llama igual a la propiedad, por eso solo se pone onDrop y no onDrop: onDrop()
    });

    const formik = useFormik({
        initialValues: initialValues(pelicula),
        validationSchema: Yup.object(pelicula ? updateSchema() : newSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (pelicula) await updatePelicula(pelicula.id, formValue);
                else await addPelicula(formValue);
                onRefetch();
                onClose();
            } catch (error) {
                console.error(error)
            }
        }
    })

    return (
        <Form className='add-edit-pelicula-form' onSubmit={formik.handleSubmit}>
            <Form.Input name="nombre" value={formik.values.nombre} onChange={formik.handleChange} error={formik.errors.nombre} placeholder="Nombre de la pelicula"></Form.Input>
            <Form.Input name="duracion" value={formik.values.duracion} onChange={formik.handleChange} error={formik.errors.duracion} placeholder="Duracion"></Form.Input>
            <Form.Input name="video_trailer" value={formik.values.video_trailer} onChange={formik.handleChange} error={formik.errors.video_trailer} placeholder="Enlace trailer Youtube"></Form.Input>
            <Form.Input name="actores" value={formik.values.actores} onChange={formik.handleChange} error={formik.errors.actores} placeholder="Actores"></Form.Input>
            <Form.Input name="director" value={formik.values.director} onChange={formik.handleChange} error={formik.errors.director} placeholder="Director"></Form.Input>
            <Form.Input name="genero" value={formik.values.genero} onChange={formik.handleChange} error={formik.errors.genero} placeholder="Género"></Form.Input>
            <Form.Input name="origen" value={formik.values.origen} onChange={formik.handleChange} error={formik.errors.origen} placeholder="Lugar Origen"></Form.Input>
            <Form.Input name="distribuidor" value={formik.values.distribuidor} onChange={formik.handleChange} error={formik.errors.distribuidor} placeholder="Distribuidor"></Form.Input>
            <Form.Input name="tipo" placeholder='Tipo' value={formik.values.tipo} onChange={formik.handleChange} error={formik.errors.tipo} />
            <Form.Input name="clasificacion" placeholder='Clasificación' value={formik.values.clasificacion} onChange={formik.handleChange} error={formik.errors.clasificacion} />
            <TextArea rows={2} placeholder='Descripción corta' name='descripcion_corta' value={formik.values.descripcion_corta} onChange={formik.handleChange} error={formik.errors.descripcion_corta} />
            <TextArea rows={3} placeholder='Descripción larga' name='descripcion_larga' value={formik.values.descripcion_larga} onChange={formik.handleChange} error={formik.errors.descripcion_larga} />

            <Button type='button' fluid {...getRootProps()} color={formik.errors.poster && "red"}>
                {previewImage ? "Editar Póster" : "Subir Póster"}
            </Button>

            <input {...getInputProps()} />

            <Image src={previewImage} />

            <Button type='submit' content={pelicula ? "Actualizar" : "Registrar"} color={pelicula ? "yellow" : "green"} fluid />
        </Form>
    )
}

function initialValues(data) {
    return {
        nombre: data?.nombre || "",
        duracion: data?.duracion || "",
        video_trailer: data?.video_trailer || "",
        actores: data?.actores || "",
        director: data?.director || "",
        genero: data?.genero || "",
        origen: data?.origen || "",
        distribuidor: data?.distribuidor || "",
        tipo: data?.tipo || "",
        clasificacion: data?.clasificacion || "",
        descripcion_corta: data?.descripcion_corta || "",
        descripcion_larga: data?.descripcion_larga || "",
        poster: "",
    }
}

function newSchema() {
    return {
        nombre: Yup.string().required(true),
        duracion: Yup.string().required(true),
        video_trailer: Yup.string().required(true),
        actores: Yup.string().required(true),
        director: Yup.string().required(true),
        genero: Yup.string().required(true),
        origen: Yup.string().required(true),
        distribuidor: Yup.string().required(true),
        tipo: Yup.string().required(true),
        clasificacion: Yup.string().required(true),
        descripcion_corta: Yup.string().required(true),
        descripcion_larga: Yup.string().required(true),
        poster: Yup.string().required(true),
    }
}

function updateSchema() {
    return {
        nombre: Yup.string().required(true),
        duracion: Yup.string().required(true),
        video_trailer: Yup.string().required(true),
        actores: Yup.string(),
        director: Yup.string(),
        genero: Yup.string(),
        origen: Yup.string(),
        distribuidor: Yup.string(),
        tipo: Yup.string().required(true),
        clasificacion: Yup.string().required(true),
        descripcion_corta: Yup.string().required(true),
        descripcion_larga: Yup.string(),
        poster: Yup.string(),
    }
}