import { TEvent } from '@utils/modules/FetchApi/Event/EventAPI';
import { View } from 'react-native';
import { AppIcon } from '@elements/AppIcon';
import { AppText } from '@elements/AppText';
import { getTimeString, useAppSize, useAppTheme } from '@utils/modules';
import { EventListGroupItem } from './EventListGroupItem';
import { ComonStyle } from '@utils/resource';
import { getImpactStyles } from '@screens/Highlight/modules/useHandleItem';
import { EventListGroupDot } from './EventListGroupDot';

export function EventListGroup(
  props: Readonly<{ data: { date: string; events: TEvent[] }; index: number }>,
) {
  const { Sizes } = useAppSize();
  const { Colors } = useAppTheme();

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: Sizes.padding.medium,
          marginBottom: Sizes.padding.default,
          paddingHorizontal: Sizes.padding.default,
          marginTop: Sizes.padding.small,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: Sizes.padding.small,
            paddingHorizontal: Sizes.padding.default,
            borderWidth: 1,
            borderColor: '#60a5fa22',
            backgroundColor: '#60a5fa11',
            borderRadius: Sizes.border_radius,
          }}
        >
          <AppIcon
            name="calendar"
            size={16}
            color={Colors.app.Text_Primary}
            style={{ marginRight: 6 }}
          />
          <AppText style={{ fontSize: 13, fontWeight: '600' }}>
            {props.data.date}
          </AppText>
        </View>

        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: Colors.app.Shape_Divider,
          }}
        />
      </View>
      {props.data?.events.map((event, index) => {
        const timeStr = getTimeString(event.earliestPublished);
        const styles = getImpactStyles(event.impact);

        return (
          <View
            key={event.id}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              paddingHorizontal: Sizes.padding.small,
            }}
          >
            <View style={ComonStyle.center}>
              <View
                style={{
                  width: 1,
                  backgroundColor: Colors.app.Shape_Border,
                  position: 'absolute',
                  height: '100%',
                  top: 0,
                }}
              />
              <View
                style={{
                  backgroundColor: '#f3f4f6',
                  paddingVertical: 2,
                  paddingHorizontal: 8,
                  borderRadius: Sizes.border_radius,
                  marginBottom: 12,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AppIcon name="clock" size={12} color="#6b7280" />
                  <AppText
                    style={{ marginLeft: 4, fontSize: 11, color: '#6b7280' }}
                  >
                    {timeStr}
                  </AppText>
                </View>
              </View>
              {/* Dot */}
              <EventListGroupDot color={styles.dotColor} />
            </View>
            <EventListGroupItem key={event.id} data={event} index={index} />
          </View>
        );
      })}
    </View>
  );
}
