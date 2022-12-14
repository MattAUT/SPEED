import { Table, TableHead, TableRow, TableCell, TableSortLabel, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import{ faQuestion, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { styled } from "goober";
import { visuallyHidden } from '@mui/utils';

const API_URI = process.env.REACT_APP_API_URL;

type TableData = {
  _id: string,
  title: string,
  authors: string,
  source: string,
  year: number,
  doi: string,
  recommends: string,
}

type Props = {
    practice: string;
    label: string;
    years: number[];
  };

//Table Sorting Functions from Material UI Demos
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

type HeadCell = {
  id: keyof TableData;
  disablePadding: boolean;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Article Title',
  },
  {
    id: 'authors',
    numeric: false,
    disablePadding: false,
    label: 'Article Authors',
  },
  {
    id: 'source',
    numeric: false,
    disablePadding: false,
    label: 'Article Source',
  },
  {
    id: 'year',
    numeric: true,
    disablePadding: false,
    label: 'Publication Year',
  },
  {
    id: 'doi',
    numeric: false,
    disablePadding: false,
    label: 'Article DOI',
  },
  {
    id: 'recommends',
    numeric: false,
    disablePadding: false,
    label: 'Practice?',
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TableData) => void;
  order: Order;
  orderBy: string;
  practice: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort, practice } =
    props;
  const createSortHandler =
    (property: keyof TableData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TextWrapCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <h2>{(headCell.label.includes("Practice") ? "Recommends "  : "")}{(headCell.label.includes("Practice") ? <br></br> : "")}{(headCell.label.includes("Practice") ? headCell.label.replace("Practice", practice) : headCell.label)}</h2>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TextWrapCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
//Table Sorting Functions end

const TextWrapCell = styled(TableCell)`
  white-space: normal;
  word-wrap: break-word;
  text-align: center !important;
`;

const NoArticles = styled("h1")`
  display: block;
  width: 100%;
  text-align: center !important;
`;

const SortableArticles = ({ practice, label, years }: Props) => {
  const [tableData, setTableData] = useState<TableData[]>([]);

  useEffect(() => {
    fetch(`${API_URI}/fetch`)
      .then((res) => res.json())
      .then((data) => {
        let year1 = (years[0] < years[1] ? years[0] : years[1]);
        let year2 = (years[0] > years[1] ? years[0] : years[1]);
        let filteredData = data.filter((obj: any) => {
          return obj.status === "Approved" && obj.type === practice && (obj.year >= year1 && obj.year <= year2);
        })
        setTableData(filteredData);
      });
  }, [practice, years]);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof TableData>("_id");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TableData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const tableheader = 
      <EnhancedTableHead
      order={order}
      orderBy={orderBy}
      onRequestSort={handleRequestSort}
      practice={label}
      />

  const dataBody = tableData.slice().sort(getComparator(order, orderBy)).map((article: any, index) => 
    <TableRow id={article._id}>
      <TextWrapCell>{article.title}</TextWrapCell>
      <TextWrapCell>{article.authors.join(", ")}</TextWrapCell>
      <TextWrapCell>{article.source}</TextWrapCell>
      <TextWrapCell>{article.year}</TextWrapCell>
      <TextWrapCell><a href="{article.doi}">{article.doi}</a></TextWrapCell>
      <TextWrapCell>{(article.recommends === "x" ? 
        <FontAwesomeIcon icon={faQuestion} size="4x" /> :
         (article.recommends === "y" ? 
          <FontAwesomeIcon style={{'color': 'limegreen'}} icon={faCheck} size="4x" /> :
          <FontAwesomeIcon style={{'color': 'red'}} icon={faX} size="4x" />))}
      </TextWrapCell>
    </TableRow>
  );

  return (
        <Table style={{maxWidth: '70%'}}>
          {(dataBody.length ? tableheader : null)}
          {(dataBody.length ? dataBody : <NoArticles>No Articles Found</NoArticles>)}
        </Table>
  );
};

export default SortableArticles;