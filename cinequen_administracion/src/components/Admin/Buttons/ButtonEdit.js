import React from 'react'
import { Button } from "semantic-ui-react"

export function ButtonEdit(props) {
    const { funcion, objeto } = props;
    return (
        <Button icon color='yellow' onClick={() => funcion(objeto)} >
            <i class="fa-duotone fa-pencil fa-lg"></i>
        </Button>
    )
}
