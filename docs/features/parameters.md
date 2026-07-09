# Parameter Store

The **Parameters** view manages AWS Systems Manager Parameter Store directly from SSM Dojo. It
always works in the profile and region selected in the app, so check those controls before creating
or changing a parameter.

## Manage parameters

Use the search box to filter by name, select a parameter to inspect it, and choose **New parameter**
to create one. The list loads more results as needed.

When creating or updating a parameter, you can set:

| Field | Purpose |
| --- | --- |
| **Name and value** | The parameter path/name and its stored value. |
| **Type** | `String`, `StringList`, or `SecureString`. |
| **Description** | A human-readable explanation of the parameter. |
| **KMS key** | The key for a `SecureString`; omit it to use the account's default SSM key. |
| **Allowed pattern** | A regular expression AWS validates before accepting a value. |
| **Tier and data type** | Standard, Advanced, or Intelligent-Tiering, plus the Parameter Store data type. |
| **Policies** | Parameter Store policy JSON, such as expiration or no-change notifications. |
| **Tags** | Key/value metadata for organization and access controls. |

You can delete a parameter from its editor. Deletion is performed in AWS for the selected profile
and region.

## Free cloud operations

Listing, reading, creating, updating, tagging, and deleting parameters all run directly against
your AWS account and are available on the Free plan. SSM Dojo does not proxy or copy those cloud
operations through another service.

## SecureString parameters

`SecureString` values are encrypted by AWS KMS. Use a symmetric KMS key, and make sure the selected
profile is allowed by both IAM and the key policy to use it. SSM Dojo keeps values masked until you
choose to reveal them.

Parameter names, descriptions, and tags are not secret values. Avoid placing sensitive information
in those fields. See AWS's [SecureString encryption guidance](https://docs.aws.amazon.com/systems-manager/latest/userguide/secure-string-parameter-kms-encryption.html)
for more detail.

## Saved revisions (Pro)

Pro keeps a local history of the **five most recent prior values** for each profile, region, and
parameter-name combination. After a successful update made in SSM Dojo, it saves the value that was
in AWS immediately before that update. New parameters have no prior revision yet.

Saved revisions are encrypted before they are written to SSM Dojo's local configuration storage.
They are not uploaded, shared between devices, or fetched from AWS Parameter Store version history.
Changes made in the AWS console, CLI, or another tool are not added to this local history. Deleting
a parameter in SSM Dojo also clears its saved local revisions.

For a `SecureString`, you must explicitly reveal saved revisions before SSM Dojo loads or displays
their values.

## Compare revisions

The default comparison is the latest saved revision against the **Current cloud** value. Use the
**Base** and **Compare** controls to choose any two available values, including two saved revisions
or a reversed cloud comparison.

Choose a display mode to suit the review:

- **Unified** shows one Git-style stream with line numbers and `-`/`+` changes.
- **Side by side** aligns base and comparison lines in two columns, with removals highlighted on the
  base side and additions on the comparison side.

Equal selections simply show that there are no content changes.

## IAM permissions

The selected profile needs permissions appropriate to what you do. For the complete policy model,
see AWS's [Parameter Store IAM guidance](https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-access.html).

| Task | Required permissions |
| --- | --- |
| List and inspect | `ssm:DescribeParameters`, `ssm:GetParameter`, `ssm:ListTagsForResource` |
| Create or update | `ssm:PutParameter`, `ssm:AddTagsToResource`, `ssm:RemoveTagsFromResource` |
| Delete | `ssm:DeleteParameter` |
| Read a `SecureString` | `kms:Decrypt` for its KMS key |
| Write a `SecureString` | `kms:Encrypt` for a standard parameter, or `kms:GenerateDataKey` for an advanced parameter |

Customer-managed KMS keys also need a key policy that permits the selected principal. Scope all IAM
and KMS permissions to the parameters and keys the user needs.
