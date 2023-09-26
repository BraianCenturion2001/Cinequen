import React, { useEffect, useState } from 'react'
import "./AddPeliculaEstablecimientoForm.scss"
import { Form, Button, Dropdown, Checkbox } from "semantic-ui-react"
import { usePeliculaEstablecimiento } from "../../../../hooks"
import { useFormik } from "formik";
import * as Yup from "yup";
import { map } from 'lodash';

export function AddPeliculaEstablecimientoForm(props) {
    const { onClose, onRefetch, establecimiento } = props;
    const { loading, peliculasEstablecimientos, getPEExclude, addPeliculasEstablecimiento } = usePeliculaEstablecimiento();
    const [peliculasOptions, setPeliculasOptions] = useState([]);
    const [isDropdownDisabled, setIsDropdownDisabled] = useState(true);

    useEffect(() => {
        getPEExclude(establecimiento.id)
    }, [])

    console.log(peliculasEstablecimientos)
    useEffect(() => {
        if (!loading) {
            setPeliculasOptions(formatDropdownData(peliculasEstablecimientos));
            setIsDropdownDisabled(false);
        }
    }, [loading, peliculasEstablecimientos]);

    const tipoOptions = [
        { key: '1', value: 1, text: 'Estreno' },
        { key: '2', value: 2, text: 'Pre-Venta' },
        { key: '3', value: 3, text: 'Premier' },
        { key: '4', value: 4, text: 'Exclusiva' },
        { key: '5', value: 5, text: 'Útimos Días' },
    ];

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const updatedFormValue = {
                    ...formValue,
                    establecimiento: establecimiento.id
                };

                await addPeliculasEstablecimiento(updatedFormValue);
                onRefetch();
                onClose();
            } catch (error) {
                console.error(error)
            }
        }
    })

    return (
        <Form className='add-pelicula-establecimiento-form' onSubmit={formik.handleSubmit}>
            <Dropdown placeholder='Tipo de sala' fluid selection search options={tipoOptions} value={formik.values.tipo} onChange={(_, data) => formik.setFieldValue('tipo', data.value)} error={formik.errors.tipo} />

            <Dropdown placeholder='Pelicula'
                fluid selection search
                options={peliculasOptions}
                value={formik.values.pelicula}
                onChange={(_, data) => formik.setFieldValue('pelicula', data.value)}
                error={formik.errors.pelicula}
                disabled={isDropdownDisabled}
            />

            <div className='add-edit-sala-form__active'>
                <Checkbox toggle defaultChecked={true} checked={formik.values.activo} onChange={(_, data) => formik.setFieldValue('activo', data.checked)} />
                Activo
            </div>

            <Button type='submit' content="Registrar" color="green" fluid />
        </Form >
    )
}

function formatDropdownData(data) {
    return map(data, (item) => ({
        key: item.pelicula_data.id,
        text: item.pelicula_data.nombre,
        value: item.pelicula_data.id
    }));
}

function initialValues() {
    return {
        tipo: "",
        pelicula: "",
        activo: true,
    }
}

function newSchema() {
    return {
        pelicula: Yup.string().required(true),
        tipo: Yup.string().required(true),
        activo: Yup.bool().required(true),
    }
}