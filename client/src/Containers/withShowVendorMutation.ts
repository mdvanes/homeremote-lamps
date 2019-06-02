import { withMutation } from "react-apollo";
import { gql } from "apollo-boost";

interface Location {
  __typename?: "Location";
  lon: number;
  lat: number;
}

export interface Vendor {
  __typename?: "Vendor";
  name: string;
  stock: string[];
  location: Location;
}

interface ShowVendorMutationVariables {
  vendor: Vendor;
}

// const withShowVendorMutation = <TProps, TChildProps = {}>(
//   operationOptions: OperationOption<
//     TProps,
//     Vendor[],
//     ShowVendorMutationVariables,
//     TChildProps
//   >
// ) =>
//   withMutation<TProps, Vendor[], ShowVendorMutationVariables, TChildProps>(
//     gql`
//       mutation showVendorMutation($vendor: VendorInput) {
//         showVendor(vendor: $vendor)
//       }
//     `,
//     {
//       name: "showVendorMutation",
//       ...operationOptions
//     }
//   );

// TODO fix typings
const withShowVendorMutation = () =>
  withMutation(
    gql`
      mutation showVendorMutation($vendorName: String) {
        showVendor(vendorName: $vendorName) @client
      }
    `,
    {
      name: "showVendorMutation"
    }
  );

export default withShowVendorMutation;
