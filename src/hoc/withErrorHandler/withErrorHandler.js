import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Wrapper from '../Wrapper/Wrapper';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentDidMount() {
            // Si c'est une requête alors on ne gère pas l'erreur (potentielle) ici
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })
            // Si on a une response, on met l'erreur, si il y en a une
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            })
        }

        componentWillUnmount() {
            // lors du déchargement du component, on clear les intercepteurs axios
            // Car a chaque fois qu'on va appeler un withErrorHandler on va passer dans le componentDidMount et on va créer 2 interceptors ==> destructeur
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        // Si on clique on veut fermer les erreurs, on met un listener pour clear le state (et donc caché le HTML)
        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Wrapper>
                    {/* Si on a un erreur, on l'affiche */}
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Wrapper>
            );
        }
    }
}

export default withErrorHandler;