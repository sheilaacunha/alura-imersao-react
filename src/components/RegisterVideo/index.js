import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from '@supabase/supabase-js'


// Whiteboarding
// Custom Hook para seu formularioa
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (evento) => {
            console.log(evento.target);
            const value = evento.target.value;
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}
const POJECT_URL = "https://jkmxaapyxpeaiytvzykf.supabase.co"

const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprbXhhYXB5eHBlYWl5dHZ6eWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMTE4NjAsImV4cCI6MTk4Mzc4Nzg2MH0.LB5-YGh2-_qMm-SRhAGkJbtBUHSrDqyVemMe64Ca_RE"

const supabase = createClient(POJECT_URL, PUBLIC_KEY)

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "Frost punk", url: "www.youtube.com/watch?v=QsqatJxAUtk" }
    });
    const [formVisivel, setFormVisivel] = React.useState(false);

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>

            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        console.log(formCadastro.values);

                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb:getThumbnail(formCadastro.values.url), playlist: "jogos",

                        })
                        .then((oqueveio) => {
                console.log(oqueveio);
                         })
                         .catch((err) => {
                console.log(err);
                         })


            setFormVisivel(false);
            formCadastro.clearForm();
                    }}>
            <div>
                <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                    X
                </button>
                <input
                    placeholder="Titulo do vídeo"
                    name="titulo"
                    value={formCadastro.values.titulo}
                    onChange={formCadastro.handleChange}
                />
                <input
                    placeholder="URL"
                    name="url"
                    value={formCadastro.values.url}
                    onChange={formCadastro.handleChange}
                />
                <button type="submit">
                    Cadastrar
                </button>
            </div>
        </form>
    )
                : false
}
        </StyledRegisterVideo >
    )
}


