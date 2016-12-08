const buttonsInstance = (
    <ReactBootstrap.ButtonToolbar>
        <ReactBootstrap.Button>Edit</ReactBootstrap.Button>
        <ReactBootstrap.Button bsStyle="danger">Delete</ReactBootstrap.Button>
    </ReactBootstrap.ButtonToolbar>
);

const button = (
    <ReactBootstrap.Button>Add Recipe</ReactBootstrap.Button>
);

const listgroupInstance = (
    <ReactBootstrap.ListGroup>
        <ReactBootstrap.ListGroupItem>Item 1</ReactBootstrap.ListGroupItem>
        <ReactBootstrap.ListGroupItem>...</ReactBootstrap.ListGroupItem>
    </ReactBootstrap.ListGroup>
);

const pageHeaderInstance = (
    <ReactBootstrap.PageHeader>
        <small>Subtext for header</small>
    </ReactBootstrap.PageHeader>
);

function FieldGroup({id, label, help, ...props}) {
    return (
        <ReactBootstrap.FormGroup controlId={id}>
            <ReactBootstrap.ControlLabel>{label}</ReactBootstrap.ControlLabel>
            <ReactBootstrap.FormControl {...props} />
            {help && <ReactBootstrap.HelpBlock>{help}</ReactBootstrap.HelpBlock>}
        </ReactBootstrap.FormGroup>
    );
}

const formInstance = (
    <form>
        <ReactBootstrap.FieldGroup
            id="formControlsText"
            type="text"
            label="Text"
            placeholder="Enter text"
        />
        <ReactBootstrap.FormGroup controlId="formControlsTextarea">
            <ReactBootstrap.ControlLabel>Textarea</ReactBootstrap.ControlLabel>
            <ReactBootstrap.FormControl componentClass="textarea" placeholder="textarea"/>
        </ReactBootstrap.FormGroup>
    </form>
);

class ModalInstance extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="static-modal">
                <ReactBootstrap.Modal show={this.props._open} onHide={this.props._close}>
                    <ReactBootstrap.Modal.Header>
                        <ReactBootstrap.Modal.Title>Modal title</ReactBootstrap.Modal.Title>
                    </ReactBootstrap.Modal.Header>

                    <ReactBootstrap.Modal.Body>
                        {formInstance}
                    </ReactBootstrap.Modal.Body>

                    <ReactBootstrap.Modal.Footer>
                        <ReactBootstrap.Button>Close</ReactBootstrap.Button>
                        <ReactBootstrap.Button bsStyle="primary">Save changes</ReactBootstrap.Button>
                    </ReactBootstrap.Modal.Footer>

                </ReactBootstrap.Modal>
            </div>)
    }
}

const accordionInstance = (
    <ReactBootstrap.Accordion >
        <ReactBootstrap.Panel header="Item #1" eventKey="1" bsStyle="danger">
            {pageHeaderInstance}
            {listgroupInstance}
            {buttonsInstance}
        </ReactBootstrap.Panel>
    </ReactBootstrap.Accordion>
);

class RecipeBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    close() {
        this.setState({showModal: false});
    }

    open() {
        this.setState({showModal: true});
    }

    render() {
        return (
            <div>
                {accordionInstance}
                <ReactBootstrap.Button bsStyle="primary" bsSize="large" onClick={this.open}>Add
                    Recipe</ReactBootstrap.Button>
                <ModalInstance _open={this.open.bind(this)} _close={this.close.bind(this)}/>
            </div>
        );
    }
}

ReactDOM.render(<RecipeBox/>, document.getElementById("root"));