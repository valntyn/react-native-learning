import { FontAwesome5 } from '@expo/vector-icons';

export interface StepsInterface {
    title: string;
    description: string;
    image: keyof typeof FontAwesome5.glyphMap;
}

export const onboardingSteps: StepsInterface[] = [
    {
        title: 'Track every move',
        description:
            'Monitor your spending and contributions, ensuring every penny aligns with your\n'
            + 'familys aspirations',
        image: 'people-arrows',
    },
    {
        title: 'Welcome to PROJECT',
        description: 'React Native with Expo learning and honing React skills',
        image: 'snowflake',
    },
    {
        title: 'This is Real Project',
        description:
            'Monitor your spending and contributions, ensuring every penny aligns with your\n'
            + 'familys aspirations',
        image: 'slideshare',
    },
];
