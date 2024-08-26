import { api_endpoint } from "@/constants";
import { GraphQLClient, gql } from "graphql-request";
import { uploadImageToCloudinary } from "@/libs/cloudinary";

// Ensure that api_endpoint is defined
if (!api_endpoint) {
  throw new Error("API endpoint is not defined");
}

const graphQLClient = new GraphQLClient(api_endpoint, {
  headers: {
    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjIzMzgwNTcsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2x6NDZ4MjNrMDFmdjA3dWp4aW9lbGtkZy9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiOGVlMjlmYTItMzA5My00Y2UyLWJmZWEtOTgwNWViMjdlMGZlIiwianRpIjoiY2x6OGJseTg2MXh1YTA3bWZieHR3ZGkwMCJ9.ykeMjGLTPMwUPi7hxIFHKwtQlFEQj-wdmufBlRq6PSujI-fG-2pHT6T4ZncpKfxeFCgcVLpqL4h466_kWLusI-a0YNxhcy1s3o4yzv58jhhURDnQ6j5UXwY0AcglXHYMMsJzQuslLX0VfCI5k__ogi8hSaJ402ssfLwX6IU04ZBaIHkXzVrb-inzoKjGnsaAoxxN08EU44W_LCrPnKueiHB8GJlZhcMg0dXICAbpIEIo5MJuh1DsBMpeMSMd2wKij3djxFUPML3We123Wbdkt9gpyVvFfGXCboOI_9gVJGHPSfKV2sStfEafY88E1Nk71zQSxF41wbSt4nz2fk5U7tn8Fc1P3oEQYuBKC0dtEOt6ll4a7NQXdcIz4OPVZ87dweYwlSMxxAVFDqLs1imJ4kMWUjBxLqnPYTvq7kQAY7UyB6Brb25NJp46Wb3lojL_0gTesbgcZQdP6xo7Xey8sl1rSC_u3ylFBl2PxerQgYxWzCyr3iVh61SIDOjr5dFGdloBm6ztoo4RuBuOOsfwLGJhF6Qw58KMnAkrY7YMne_x6bTVjx7ia2VFiQ4FxOhYF03T-QtoWY_YWovXnbq46G8M5KZAo8lsReq-F4U1xBNbaNWUB-Vur2oH6v2_061sbuqruXO-2LolSNmAkyLiVa0oNn2Jjp-MFKZic_g1hnk`,
  },
});

export const gamerRegistration = async (formValue, imageFile) => {
  try {
    // Upload the image first and get the URL
    const uploadUrl = await uploadImageToCloudinary(imageFile);

    if (!uploadUrl) {
      throw new Error("Image upload failed");
    }

    // Prepare the mutation
    const mutationQuery = gql`
      mutation GameRegistration(
        $firstname: String!
        $lastname: String!
        $location: String!
        $email: String!
        $phonenumber: Float!
        $uploadUrl: String!
      ) {
        createGameRegistration(
          data: {
            firstname: $firstname
            lastname: $lastname
            location: $location
            email: $email
            phonenumber: $phonenumber
            gamerpix: { create: { uploadUrl: $uploadUrl } }
          }
        ) {
          id
        }
      }
    `;

    const variables = {
      firstname: formValue.firstname,
      lastname: formValue.lastname,
      location: formValue.location,
      email: formValue.email,
      phonenumber: formValue.phonenumber,
      uploadUrl,
    };

    // Perform the registration
    const response = await graphQLClient.request(mutationQuery, variables);
    console.log("Gamer registration successful:", response);
    return response;
  } catch (error) {
    console.error("Error in gamerRegistration mutation:", error);
    throw error;
  }
};
