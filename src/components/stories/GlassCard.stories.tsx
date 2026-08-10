import React from 'react';
import { Meta, Story } from '@storybook/react';
import GlassCard, { GlassCardProps } from '../GlassCard';

export default {
  title: 'Components/GlassCard',
  component: GlassCard,
} as Meta<typeof GlassCard>;

const Template: Story<GlassCardProps> = (args) => <GlassCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Vintage Travel — Water Glass Card',
  children: (
    <p>
      A sample glass card with subtle translucency and soft shadows. Use this for hero highlights, pricing, or
      feature panels.
    </p>
  ),
};
