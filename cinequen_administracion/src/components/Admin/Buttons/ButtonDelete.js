import React from 'react'
import { Button } from "semantic-ui-react"

export function ButtonDelete(props) {
    const { funcion, objeto } = props;
    return (
        <Button icon negative onClick={() => funcion(objeto)} >
            <i class="fa-duotone fa-trash-can fa-lg"></i>
        </Button>
    )
}
