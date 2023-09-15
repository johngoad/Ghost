import Button from '../../../admin-x-ds/global/Button';
import NewslettersList from './newsletters/NewslettersList';
import React, {useState} from 'react';
import SettingGroup from '../../../admin-x-ds/settings/SettingGroup';
import TabView from '../../../admin-x-ds/global/TabView';
import useRouting from '../../../hooks/useRouting';
import {useBrowseNewsletters} from '../../../api/newsletters';

const Newsletters: React.FC<{ keywords: string[] }> = ({keywords}) => {
    const {updateRoute} = useRouting();
    const openNewsletterModal = () => {
        updateRoute('newsletters/add');
    };
    const [selectedTab, setSelectedTab] = useState('active-newsletters');
    const {data: {newsletters} = {}} = useBrowseNewsletters();

    const buttons = (
        <Button color='green' label='Add newsletter' link linkWithPadding onClick={() => {
            openNewsletterModal();
        }} />
    );

    const tabs = [
        {
            id: 'active-newsletters',
            title: 'Active',
            contents: (<NewslettersList newsletters={newsletters?.filter(newsletter => newsletter.status === 'active') || []} />)
        },
        {
            id: 'archived-newsletters',
            title: 'Archived',
            contents: (<NewslettersList newsletters={newsletters?.filter(newsletter => newsletter.status !== 'active') || []} />)
        }
    ];

    return (
        <SettingGroup
            customButtons={buttons}
            keywords={keywords}
            navid='newsletters'
            testId='newsletters'
            title='Newsletters'
        >
            <TabView selectedTab={selectedTab} tabs={tabs} onTabChange={setSelectedTab} />
        </SettingGroup>
    );
};

export default Newsletters;
