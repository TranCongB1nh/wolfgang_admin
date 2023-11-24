
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExportContainer,
    GridCsvExportMenuItem, } from '@mui/x-data-grid';

const csvOptions = { delimiter: ';', utf8WithBom: true, };
function CustomExportButton(props) {
    return (
        <GridToolbarExportContainer {...props}>
        <GridCsvExportMenuItem options={csvOptions} /> 
        </GridToolbarExportContainer>
    );
    }
export function CustomToolbar(props) {
    return (
        <GridToolbarContainer {...props}>
        <CustomExportButton />
        </GridToolbarContainer>
    );
}