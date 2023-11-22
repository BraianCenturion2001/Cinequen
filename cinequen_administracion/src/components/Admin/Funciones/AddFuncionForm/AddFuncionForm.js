import React, { useState, useEffect } from 'react'
import "./AddFuncionForm.scss"
import { Form, Button, Dropdown } from "semantic-ui-react"
import { Grid } from '@mui/material';
import { useEstablecimiento, usePeliculaEstablecimiento, useSala, useFuncion } from "../../../../hooks"
import { useFormik } from "formik";
import * as Yup from "yup";
import { map } from 'lodash';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

export function AddFuncionForm(props) {
    const { onClose, onRefetch, funcion } = props;

    const [establecimientosFormato, setEstablecimientosFormato] = useState([])
    const [peliculasOptions, setPeliculasOptions] = useState([]);
    const [salasOptions, setSalasOptions] = useState([]);
    const [isDropdownDisabled, setIsDropdownDisabled] = useState(true);

    const { establecimientos, getEstablecimientos } = useEstablecimiento();
    const { loading: loadingPE, peliculasEstablecimientos, getPEFiltro1 } = usePeliculaEstablecimiento();
    const { loading: loadingSalas, salas, getSalasEstablecimiento } = useSala();
    const { addFuncion, updateFuncion } = useFuncion();

    const formatoOptions = [
        { key: '1', value: '2-D', text: '2-D' },
        { key: '2', value: '3-D', text: '3-D' },
    ];

    const idiomaOptions = [
        { key: '1', value: 'Español', text: 'Español' },
        { key: '2', value: 'Subtitulado', text: 'Subtitulado' },
    ];

    useEffect(() => {
        getEstablecimientos()
        if (funcion) {
            handleEstablecimientoChange(null, { value: funcion.sala_data.establecimiento_data.id });
        }
    }, [])

    useEffect(() => {
        setEstablecimientosFormato(formatDropdownData(establecimientos))
    }, [establecimientos]);

    useEffect(() => {
        if (!loadingPE) {
            const peliculasData = peliculasEstablecimientos.map((item) => item.pelicula_data);
            setPeliculasOptions(formatDropdownData(peliculasData));
            if (funcion) {
                formik.setFieldValue('pelicula', funcion.pelicula_data.id);
            }
        }
    }, [loadingPE, peliculasEstablecimientos]);

    useEffect(() => {
        if (!loadingSalas) {
            setSalasOptions(formatDropdownData(salas));
            if (funcion) {
                formik.setFieldValue('sala', funcion.sala_data.id);
            }
        }
    }, [loadingSalas, salas]);

    const handleEstablecimientoChange = async (event, data) => {
        setIsDropdownDisabled(true);
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
        validationSchema: Yup.object(funcion ? updateSchema() : newSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            //console.log(formValue)
            try {
                if (funcion) await updateFuncion(funcion.id, formValue);
                else await addFuncion(formValue);
                onRefetch();
                onClose();
            } catch (error) {
                console.error(error)
            }
        }
    })

    const fecha = funcion ? dayjs(funcion.fecha) : null;
    const hora_inicio = funcion ? dayjs(funcion.hora_inicio, 'HH:mm:ss') : null;
    const hora_fin = funcion ? dayjs(funcion.hora_fin, 'HH:mm:ss') : null;

    return (
        <Form className='add-edit-funcion-form' onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <DatePicker
                        name="fecha"
                        label="Fecha"
                        value={fecha}
                        onChange={(newFecha) => formik.setFieldValue('fecha', dayjs(newFecha).format('YYYY-MM-DD'))}
                        error={formik.errors.fecha}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TimePicker
                        label="Horario de inicio"
                        views={['hours', 'minutes']}
                        ampm={false}
                        value={hora_inicio}
                        onChange={(newHora) => formik.setFieldValue('hora_inicio', dayjs(newHora).format('HH:mm:ss'))}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TimePicker
                        label="Horario de finalización"
                        views={['hours', 'minutes']}
                        ampm={false}
                        value={hora_fin}
                        onChange={(newHora) => formik.setFieldValue('hora_fin', dayjs(newHora).format('HH:mm:ss'))}
                    />
                </Grid>
            </Grid>

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

            <Dropdown placeholder='Formato' fluid selection search options={formatoOptions} value={formik.values.formato} onChange={(_, data) => formik.setFieldValue('formato', data.value)} error={formik.errors.formato} />

            <Dropdown placeholder='Idioma' fluid selection search options={idiomaOptions} value={formik.values.idioma} onChange={(_, data) => formik.setFieldValue('idioma', data.value)} error={formik.errors.idioma} />


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
        establecimiento: "",
        pelicula: "",
        sala: "",
        formato: data?.formato || "",
        idioma: data?.idioma || "",
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
        formato: Yup.string().required(true),
        idioma: Yup.string().required(true),
    }
}

function updateSchema() {
    return {
        fecha: Yup.string().required(true),
        hora_fin: Yup.string().required(true),
        hora_inicio: Yup.string().required(true),
        establecimiento: Yup.string().required(true),
        pelicula: Yup.string().required(true),
        sala: Yup.string().required(true),
        formato: Yup.string().required(true),
        idioma: Yup.string().required(true),
    }
}