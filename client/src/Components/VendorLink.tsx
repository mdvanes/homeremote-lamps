import React, { FC } from "react";
import styled from "styled-components";
import withShowVendorMutation, {
  Vendor
} from "../Containers/withShowVendorMutation";

interface OuterProps {
  vendor: Vendor;
}

interface Props extends OuterProps {
  showVendorMutation: any; // MutationFn;
  // mutate: MutationFn; // MutationFn<{}, { vendor: Vendor }>;
}

const Button = styled.button`
  background: transparent;
  border: none;
  color: blue;
  text-decoration: underline;
  margin-right: 4px;
`;

const VendorLink: FC<Props> = ({ vendor, showVendorMutation }): JSX.Element => (
  <Button onClick={(): void => showVendorMutation({ vendor })}>
    {vendor.name}
  </Button>
);

// export default withShowVendorMutation<OuterProps, Props>()(VendorLink);
// @ts-ignore
export default withShowVendorMutation()(VendorLink);
