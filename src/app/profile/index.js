import { memo } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from '../../containers/login-menu';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import ProfileInfo from '../../components/profile-info';
import { Navigate } from 'react-router-dom';

function Profile() {
    const { t } = useTranslate();

    const select = useSelector(state => ({
        user: state.login.user,
        auth: state.login.auth,
        loading: state.login.loading,
    }));


    if (!select.auth && !select.loading) {
        return <Navigate to="/" />;
    }

    return (
        <PageLayout>
            <LoginMenu />
            <Head title={t('title')}>
                <LocaleSelect />
            </Head>
            <Navigation />
            <ProfileInfo user={select.user} loading={select.loading} />
        </PageLayout>
    );
}

export default memo(Profile);