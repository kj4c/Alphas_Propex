import pandas as pd

def to_dataframe(events):
    flattened_events = []
    for event in events:
        flattened_event = {
            "date_sold": pd.to_datetime(event["time_object"]["timestamp"], format='%d/%m/%Y')
        }

        flattened_event.update(event["attributes"])

        flattened_events.append(flattened_event)

    df = pd.DataFrame(flattened_events)
    df.columns = df.columns.str.strip()

    return df