let ButtonToolbar = ReactBootstrap.ButtonToolbar,
    Button = ReactBootstrap.Button,
    ListGroup = ReactBootstrap.ListGroup,
    ListGroupItem = ReactBootstrap.ListGroupItem,
    PageHeader = ReactBootstrap.PageHeader,
    FormGroup = ReactBootstrap.FormGroup,
    ControlLabel = ReactBootstrap.ControlLabel,
    FormControl = ReactBootstrap.FormControl,
    HelpBlock = ReactBootstrap.HelpBlock,
    Well = ReactBootstrap.Well,
    Panel = ReactBootstrap.Panel,
    Accordion = ReactBootstrap.Accordion,
    Modal = ReactBootstrap.Modal;

const ButtonsInstance = (props) => {

    const handleDelete = () => {
        props._onDelete(props.theKey);
    };
    const handleEdit = () => {
        props._onEdit(props.theKey);
    };
    return <ButtonToolbar>
        <Button onClick={handleEdit}>Edit</Button>
        <Button bsStyle="danger" onClick={handleDelete}>Delete</Button>
    </ButtonToolbar>
};

const ListgroupInstance = (props) => {
    let ingredients = props.foodComponents.ingredients;
    return (<ListGroup> {ingredients.map((item, index) => {
            return <ListGroupItem key={index + 1}>{item}</ListGroupItem>;
        })
        }
        </ListGroup>
    );
};

const pageHeaderInstance = (
    <PageHeader>
        <small>Ingredients</small>
    </PageHeader>
);

function FieldGroup({id, label, help, ...props}) {
    return (<FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>help</HelpBlock>}
        </FormGroup>
    );
}

const ModalInstance = (props) => {
    let input1, input2;
    const handleRecipe = (e) => {
        props.modalTitle === "Add" ? props._addRecipe(input1, input2) : props._editRecipe(input1, input2);
    };
    return <Modal show={props._showModal} onHide={props._onHide}>
        <Modal.Header closeButton>
            <Modal.Title>{props.modalTitle} Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <FieldGroup
                    id="formControlsText"
                    type="text"
                    label="Recipe"
                    placeholder="Recipe Name"
                    defaultValue={props.editValue ? props.editValue.name : ""}
                    inputRef={ref => {
                        input1 = ref;
                    }}
                />
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Ingredients</ControlLabel>
                    <FormControl componentClass="textarea"
                                 placeholder="Enter Ingredients"
                                 defaultValue={props.editValue ? props.editValue.ingredients : ""}
                                 inputRef={ref => {
                                     input2 = ref;
                                 }}/>
                </FormGroup>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props._onHide}>Close</Button>
            <Button bsStyle="primary" onClick={handleRecipe}>{props.modalTitle} Recipe</Button>
        </Modal.Footer>
    </Modal>;
};

class RecipeBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showModal2: false,
            editDefault: "",
            inputText: "",
            recipeArray: []
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.editRecipe = this.editRecipe.bind(this);
    }

    componentDidMount() {
        let defaultValues = [
            {
                name: "Pumpkin Pie",
                ingredients: ["Pumpkin Puree", "Sweetened Condensed Milk", "Eggs", "Pumpkin Pie Spice"]
            },
            {name: "Spaghetti", ingredients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"]},
            {name: "Onion Pie", ingredients: ["Onion", "Pie Crust", "Sounds Yummy right?"]}
        ];
        let values = JSON.parse(localStorage.getItem("_recipes"));
        (!this.state.recipeArray.length && values) ?
            this.setState({recipeArray: values}) :
            this.setState({recipeArray: defaultValues})
    }

    close() {
        this.setState({
            showModal: false,
            showModal2: false,
            editDefault: ""
        });
    }

    open() {
        this.setState({showModal: true});
    }

    handleDelete(value) {
        this.setState((prevState) => {
            prevState.recipeArray.splice(value, 1);
            localStorage.setItem("_recipes", JSON.stringify(prevState.recipeArray));
            return {recipeArray: prevState.recipeArray};
        });
    }

    handleEdit(value) {
        this.setState({
            showModal2: true,
            editDefault: value
        });
    }

    editRecipe(input1, input2) {
        this.setState((prevState) => {
            prevState.recipeArray[prevState.editDefault] = {
                name: input1.value,
                ingredients: input2.value.split(",")
            };
            localStorage.setItem("_recipes", JSON.stringify(prevState.recipeArray));
            return {
                recipeArray: prevState.recipeArray,
                showModal2: false
            };
        });

    }

    addRecipe(input1, input2) {

        this.setState((prevState) => {
            let tempArray = prevState.recipeArray;
            let obj = {
                name: input1.value,
                ingredients: input2.value.split(",")
            };
            tempArray.push(obj);
            localStorage.setItem("_recipes", JSON.stringify(tempArray));
            return {
                recipeArray: tempArray,
                showModal: false
            }
        });
    }

    render() {
        let items = this.state.recipeArray;
        return (<div>
            <Well>
                <Accordion >
                    {items.map((item, index) => {
                        return (
                            <Panel
                                header={items[index].name}
                                eventKey={index + 1} bsStyle="danger" key={index}>
                                {pageHeaderInstance}
                                <ListgroupInstance foodComponents={items[index]}/>
                                <ButtonsInstance theKey={index}
                                                 _onDelete={this.handleDelete.bind(this)}
                                                 _onEdit={this.handleEdit.bind(this)}
                                />
                            </Panel>);
                    })}
                </Accordion>
            </Well>
            <Button bsStyle="primary" bsSize="large" onClick={this.open}>Add Recipe</Button>
            <ModalInstance _showModal={this.state.showModal} _onHide={this.close} modalTitle="Add"
                           _addRecipe={this.addRecipe}/>
            <ModalInstance _showModal={this.state.showModal2} _onHide={this.close} modalTitle="Edit"
                           _editRecipe={this.editRecipe} editValue={items[this.state.editDefault]}/>
        </div>)
    }
}

ReactDOM
    .render(
        <RecipeBox />,
        document
            .getElementById(
                "root"
            ))
;