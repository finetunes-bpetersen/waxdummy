import React from 'react';

import qs from 'qs';
import Account from "../../components/account/Account";

const AccountPage = (props) => {
    return <Account {...props} />;
};


AccountPage.getInitialProps = async (ctx) => {
    const paths = ctx.asPath.split('/');

    return qs.parse(paths[1].replace('account?', ''));
};

export default AccountPage;
