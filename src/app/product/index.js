import { memo, useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from "react-router-dom";
import ProductItem from "../../components/product-item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import Navigation from "../../components/navigation";
import NavigationItem from "../../components/navigation-item";
import l from '../../languages/lang-rendering';

function Product({ }) {
    const [isLoading, setIsLoading] = useState(false)
    const store = useStore();
    const { id } = useParams();
    const loading = l('loading')

    useEffect(() => {
        console.log(id)
        async function load() {
            try {
                setIsLoading(true)
                await store.actions.product.load(id);
            }
            catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }
        load()
    }, [id]);

    const select = useSelector(state => ({
        product: state.product.product,
        amount: state.basket.amount,
        sum: state.basket.sum,
        lang: state.language.language,
    }));

    const callbacks = {
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
        changeLang : useCallback((lang) => store.actions.language.setLanguage(lang))
    }


    return (
        <PageLayout>
            <Head title={select.product.title} changeLang={callbacks.changeLang} lang={select.lang} />
            <Navigation>
                <NavigationItem link='/' text={l('mainLink')} />
                <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
            </Navigation>
            {isLoading ? <p>{loading}</p> : <ProductItem product={select.product} addToBasket={callbacks.addToBasket} />}
        </PageLayout>
    )
}

export default memo(Product);
