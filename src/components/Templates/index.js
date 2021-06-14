import React from "react";
import { listEmailTemplates } from "../../functions/templates";
import { Typography } from "../../styles";
import { Button } from "./styles";

export const TemplatesGallery = () => {
  const templatesPromise = listEmailTemplates();

  const [templates, setTemplates] = React.useState();
  const [listTemplates, setListTemplates] = React.useState(false);

  templatesPromise
    .then(function (data) {
      setTemplates(
        data.TemplatesMetadata.map((t) => {
          return { name: t.Name, timestamp: `${t.CreatedTimestamp}` };
        })
      );
    })
    .catch(function (err) {
      console.error(err, err.stack);
    });

  console.log(templates);

  return (
    <div>
      <Button onClick={() => setListTemplates(!listTemplates)}>
        {listTemplates ? "Hide" : "Show"} All Templates
      </Button>
      {listTemplates ? (
        <>
          <Typography.Header>Email Template Gallery</Typography.Header>
          <Typography.Header2>View Existing Email Templates</Typography.Header2>
          {templates ? (
            templates.map((template) => (
              <div>
                <b>{template.name}</b> / {template.timestamp}
              </div>
            ))
          ) : (
            <div>No templates found</div>
          )}
        </>
      ) : null}
    </div>
  );
};
