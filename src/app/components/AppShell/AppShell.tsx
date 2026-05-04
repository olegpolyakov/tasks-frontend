import type { ReactNode } from 'react';

import { Flex, Icon, Item, Text } from 'kantanui';

import Logo from '@olegpolyakov/frontend/assets/logo.svg';

import styles from './AppShell.module.scss';

export default function AppShell({ children }: { children: ReactNode }) {
    return (
        <div className={styles.root}>
            <div className={styles.nav}>
                <Logo className={styles.logo} />

                <Item color="brand" shape="rounded-m" variant="tinted" interactive>
                    <Flex column align="center">
                        <Icon name="task_alt" />
                        <Text content="Tasks" size="xs" color="secondary" decorative />
                    </Flex>
                </Item>

                <Item shape="rounded-m" variant="plain" interactive>
                    <Flex column align="center">
                        <Icon name="calendar_month" />
                        <Text content="Calendar" size="xs" color="secondary" decorative />
                    </Flex>
                </Item>

                <Item shape="rounded-m" variant="plain" interactive>
                    <Flex column align="center">
                        <Icon name="routine" />
                        <Text content="Habits" size="xs" color="secondary" decorative />
                    </Flex>
                </Item>

                <Item shape="rounded-m" variant="plain" interactive>
                    <Flex column align="center">
                        <Icon name="mindfulness" />
                        <Text content="Mind" size="xs" color="secondary" decorative />
                    </Flex>
                </Item>

                <Item shape="rounded-m" variant="plain" interactive>
                    <Flex column align="center">
                        <Icon name="exercise" />
                        <Text content="Exercise" size="xs" color="secondary" decorative />
                    </Flex>
                </Item>
            </div>

            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}