import React, { useState, useEffect } from 'react'
import "./AddFuncionForm.scss"
import { Form, Button, Checkbox, Dropdown } from "semantic-ui-react"
import { useEstablecimiento, usePeliculaEstablecimiento, useSala, useFuncion } from "../../../../hooks"
import { useFormik } from "formik";
import * as Yup from "yup";
import { map } from 'lodash';

export function AddFuncionForm(props) {
    const { onClose, onRefetch, funcion } = props;

    const [establecimientosFormato, setEstablecimientosFormato] = useState([])
    const [peliculasOptions, setPeliculasOptions] = useState([]);
    const [salasOptions, setSalasOptions] = useState([]);
    const [isDropdownDisabled, setIsDropdownDisabled] = useState(true);

    const { establecimientos, getEstablecimientos } = useEstablecimiento();
    const { loading: loadingPE, peliculasEstablecimientos, getPEFiltro1 } = usePeliculaEstablecimiento();
    const { loading: loadingSalas, salas, getSalasEstablecimiento } = useSala();
    const { addFuncion } = useFuncion();

    useEffect(() => {
        getEstablecimientos()
    }, [])

    useEffect(() => {
        setEstablecimientosFormato(formatDropdownData(establecimientos))
    }, [establecimientos]);

    useEffect(() => {
        if (!loadingPE) {
            const peliculasData = peliculasEstablecimientos.map((item) => item.pelicula_data);
            setPeliculasOptions(formatDropdownData(peliculasData));
        }
    }, [loadingPE, peliculasEstablecimientos]);

    useEffect(() => {
        if (!loadingSalas) {
            setSalasOptions(formatDropdownData(salas));
        }
    }, [loadingSalas, salas]);

    const handleEstablecimientoChange = async (event, data) => {
        setIsDropdownDisabled(true);
        setPeliculasOptions([]);
        setPeliculasOptions([]);
        formik.setFieldValue('establecimiento', data.value);
        formik.setFieldValue('pelicula', null);
        formik.setFieldValue('sala', null);
        try {
            await getPEFiltro1(data.value);
            await getSalasEstablecimiento(data.value);
        } catch (error) {
            console.error(error);
        } finally {
            setIsDropdownDisabled(false); // Habilitar el segundo dropdown después de cargar las películas
        }
    };

    const formik = useFormik({
        initialValues: initialValues(funcion),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                await addFuncion(formValue);
                onRefetch();
                onClose();
            } catch (error) {
                console.error(error)
            }
        }
    })


    return (
        <Form className='add-edit-funcion-form' onSubmit={formik.handleSubmit}>
            <Form.Input name="fecha" placeholder="Fecha" value={formik.values.fecha} onChange={formik.handleChange} error={formik.errors.fecha}></Form.Input>
            <Form.Input name="hora_inicio" placeholder="Hora Inicio" value={formik.values.hora_inicio} onChange={formik.handleChange} error={formik.errors.hora_inicio}></Form.Input>
            <Form.Input name="hora_fin" placeholder="Hora Fin" value={formik.values.hora_fin} onChange={formik.handleChange} error={formik.errors.hora_fin}></Form.Input>

            <Dropdown
                placeholder='Establecimiento'
                fluid selection search
                options={establecimientosFormato}
                value={formik.values.establecimiento}
                onChange={handleEstablecimientoChange}
                error={formik.errors.establecimiento} />

            <Dropdown placeholder='Pelicula'
                fluid selection search
                options={peliculasOptions}
                value={formik.values.pelicula}
                onChange={(_, data) => formik.setFieldValue('pelicula', data.value)}
                error={formik.errors.pelicula}
                disabled={isDropdownDisabled}
            />

            <Dropdown placeholder='Sala'
                fluid selection search
                options={salasOptions}
                value={formik.values.sala}
                onChange={(_, data) => formik.setFieldValue('sala', data.value)}
                error={formik.errors.sala}
                disabled={isDropdownDisabled}
            />

            <Button type='submit' content={funcion ? "Actualizar" : "Registrar"} color={funcion ? "yellow" : "green"} fluid />
        </Form >
    )
}


function formatDropdownData(data) {
    return map(data, (item) => ({
        key: item.id,
        text: item.nombre,
        value: item.id
    }));
}

function initialValues(data) {
    return {
        fecha: data?.fecha || "",
        hora_fin: data?.hora_fin || "",
        hora_inicio: data?.hora_inicio || "",
        establecimiento: data?.establecimiento || "",
        pelicula: data?.pelicula || "",
        sala: data?.sala || "",
    }
}

function newSchema() {
    return {
        fecha: Yup.string().required(true),
        hora_fin: Yup.string().required(true),
        hora_inicio: Yup.string().required(true),
        establecimiento: Yup.string().required(true),
        pelicula: Yup.string().required(true),
        sala: Yup.string().required(true),
    }
}

