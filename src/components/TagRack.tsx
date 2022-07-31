import React, {useState} from 'react';
import Box from '@mui/material/Box';
import rackStyle from '../../styles/RackTagStyle';
import {Tag} from '../types/Tag'

const packStyle = rackStyle.css.pack_style;
const ttc_style = rackStyle.css.ttc_style;
const barcode_style = rackStyle.sx.barcode;

type RackTagProps = {
    tag: Tag;
};

const RackTag: React.FC<RackTagProps> = (props) => {
    const {tag} = props;
    function despcriptionPrice(tag){
         if(tag.pack_description !== 'x') {
            return (<tr>
            <td className="price-label"></td>
            <td className="ppack-ht" style={packStyle}>Prix {tag.pack_description} {tag.pack_subdescription}</td>
            <td className="tax-type"></td>
            <td style={ttc_style}>{tag.ppack_ttc}&#8364;</td>
            <td className="tax-type">TTC</td>
            </tr>);
        }
        return null;
    }

    function volumicPrice(tag){
        if(tag.volumic_description !== 'x') {
            return (<tr>
                <td className="price-label"></td>
                <td className="ppack-ht" style={packStyle}>Prix {tag.volumic_description}</td>
                <td className="tax-type"></td>
                <td style={ttc_style}>{tag.volumic_price}&#8364;</td>
                <td className="tax-type">TTC</td>
            </tr>);
        }
        return null;
    }
    return (
        <Box sx={{...rackStyle.sx.tag}}>
            <Box
            sx={{
                margin: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
            >
            <Box
            sx={{
                margin: "0",
                textAlign: "center",
                fontWeight: "bold",
                fontSize:"26pt"

            }}
            >{tag.itemname}</Box>
            <span style={{fontSize: "12pt"}}> Vendu {tag.vendu}</span>
            </Box>
            <Box sx={rackStyle.sx.tableTag}>
            <table className="table-price">
                <tbody>
                    <tr>
                        <td className="price-label">Prix {tag.unite_vente}</td>
                        <td style={{textAlign: "right"}}>{tag.pu_ht}&#8364;</td>
                        <td className="tax-type">HT</td>
                        <td style={ttc_style}>{tag.pu_ttc}&#8364;</td>
                        <td className="tax-type">TTC</td>
                    </tr>
                    {despcriptionPrice(tag)}
                    {volumicPrice(tag)}
                </tbody>
            </table>
            </Box>
            <Box sx={barcode_style(tag.cbcss)}>
                <svg
                    className="svgbarcode"
                    jsbarcode-format={`${tag.cbtype}`}
                    jsbarcode-value={`${tag.barcode}`}
                    jsbarcode-textmargin="0"
                    jsbarcode-height="30"
                    jsbarcode-width="1"
                />
            </Box>
            <Box sx={rackStyle.sx.itemcode}>{tag.itemcode}</Box>
        </Box>
        );
};

export default RackTag;