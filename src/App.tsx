import { ChangeEventHandler, Component, ReactNode } from "react";
import './App.css'

type Color = 'red' | 'green' | 'blue';
type ParamTypes = 'string';

interface Param {
    id: number;
    name: string;
    type: ParamTypes;
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
    colors: Color[]
}

interface Props {
    params: Param[],
    model: Model;
}

interface State {
    model: Model,
}

const params: Param[] = [
    {
        id: 1,
        name: 'Назначение',
        type: 'string'
    },
    {
        id: 2,
        name: 'Длина',
        type: 'string'
    }
];

const model: Model = {
    paramValues: [
        {
            paramId: 1,
            value: 'повседневное'
        },
        {
            paramId: 2,
            value: 'макси'
        }
    ],
    colors: ['blue']
}



function App() {
    return (
        <div>
            <ParamEditor params={params} model={model}/>
        </div>
    )
}



class ParamEditor extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            model: props.model,
        }
    }

    public getModel(): Model {
        return this.state.model;
    }

    private getParamValue(paramId: number) {
        return this.state.model.paramValues.find(v => v.paramId === paramId);
    }

    private changeParam(value: string, paramId: number) {
        const modelValues = this.getModel().paramValues.filter(v => v.paramId !== paramId);


        this.setState(state => ({
            model: {
                ...state.model,
                paramValues: [
                    ...modelValues,
                    {
                        paramId,
                        value
                    }
                ]
            }
        }))
    }

    render(): ReactNode {
        const {params} = this.props;


        return (
            <div className='param-editor'>
                {
                    params.map(p => {
                        return (
                            <Field 
                                key={p.id}
                                param={p}
                                paramValue={this.getParamValue(p.id)}
                                onChange={(event) => this.changeParam(event.currentTarget.value, p.id)}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

interface FieldProps {
    param: Param;
    onChange: ChangeEventHandler<HTMLInputElement>
    paramValue?: ParamValue
}

class Field extends Component<FieldProps> {

    render(): ReactNode {
        const {param, paramValue, onChange} = this.props;

        return(
            <section className='field'>
                <label className='label' htmlFor={param.id.toString()}>{param.name}</label>
                <input 
                    className='input'
                    id={param.id.toString()} 
                    onChange={onChange} 
                    type='text' 
                    value={paramValue?.value || ''} 
                />
            </section>
        );
    }
}

export default App
