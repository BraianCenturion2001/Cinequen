import React, { useState, useEffect } from 'react'
import "./AddFuncionForm.scss"
import { Form, Button, Dropdown } from "semantic-ui-react"
import { useEstablecimiento, usePeliculaEstablecimiento, useSala, useFuncion } from "../../../../hooks"
import { useFormik } from "formik";
import * as Yup from "yup";
import { map } from 'lodash';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

export function AddFuncionForm(props) {
    const { onClose, onRefetch } = props;

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
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            //console.log(formValue)
            try {
                await addFuncion(formValue);
                onRefetch();
                onClose();
            } catch (error) {
                console.error(error)
            }
        }
    })

    const fecha = null;
    const hora_inicio = null;
    const hora_fin = null;

    return (
        <Form className='add-edit-funcion-form' onSubmit={formik.handleSubmit}>
            <DatePicker
                disablePast
                name="fecha"
                label="Fecha"
                value={fecha}
                onChange={(newFecha) => formik.setFieldValue('fecha', dayjs(newFecha).format('YYYY-MM-DD'))}
                error={formik.errors.fecha}
            />

            <TimePicker
                label="Horario de inicio"
                views={['hours', 'minutes']}
                ampm={false}
                value={hora_inicio}
                onChange={(newHora) => formik.setFieldValue('hora_inicio', dayjs(newHora).format('HH:mm:ss'))}
            />

            <TimePicker
                label="Horario de finalización"
                views={['hours', 'minutes']}
                ampm={false}
                value={hora_fin}
                onChange={(newHora) => formik.setFieldValue('hora_fin', dayjs(newHora).format('HH:mm:ss'))}
            />

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

            <Button type='submit' content="Registrar" color="green" fluid />
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

function initialValues() {
    return {
        fecha: "",
        hora_fin: "",
        hora_inicio: "",
        establecimiento: "",
        pelicula: "",
        sala: "",
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

